class Data {
    constructor(bills, votes, lawmakers) {
        this.bills = bills
        this.votes = votes
        this.lawmakers = lawmakers

        // console.log("NB: This is now excluding absent votes from calculations")

        this.gopCaucus = lawmakers.filter(d => d.party === 'R')
        this.demCaucus = lawmakers.filter(d => d.party === 'D')
    }

    gopCaucusVote(vote) {
        const gopNames = this.gopCaucus.map(d => d.laws_vote_name)
        const caucusVotes = vote.votes.filter(v => gopNames.includes(v.voter_name))
        const ayes = caucusVotes.filter(v => v.option === 'yes').length
        const nays = caucusVotes.filter(v => v.option === 'no').length
        const absent = caucusVotes.filter(v => ['absent','excused'].includes(v.option)).length
        return { yes: ayes, no: nays, absent: absent, caucus: (ayes > nays) ? 'yes' : 'no',}
    }
    demCaucusVote(vote) {
        const demNames = this.demCaucus.map(d => d.laws_vote_name)
        const caucusVotes = vote.votes.filter(v => demNames.includes(v.voter_name))
        const ayes = caucusVotes.filter(v => v.option === 'yes').length
        const nays = caucusVotes.filter(v => v.option === 'no').length
        const absent = caucusVotes.filter(v => ['absent','excused'].includes(v.option)).length
        return { yes: ayes, no: nays, absent: absent, caucus: (ayes > nays) ? 'yes' : 'no',}
    }
    getVoteYesCount(vote) {
        return vote.counts.find(d => d.option === 'yes').value
    }
    getVoteNoCount(vote) {
        return vote.counts.find(d => d.option === 'no').value
    }
    votePassed(vote) {
        return (this.getVoteYesCount(vote) > this.getVoteNoCount(vote))
    }
    getLawmakerVote(vote, lawmaker) {
        return vote.votes.find(d => d.voter_name === lawmaker.laws_vote_name).option
    }
    lawmakerVoteAbsent(vote, lawmaker) {
        const lawmakerVote = this.getLawmakerVote(vote, lawmaker)
        return (lawmakerVote !== 'yes') && (lawmakerVote !== 'no')
    }
    lawmakerVoteWithGopCaucus(vote, lawmaker) {
        // assumes caucus vote has been pre-calculated
        const lawmakerVote = this.getLawmakerVote(vote, lawmaker)
        return lawmakerVote === vote.gopCaucus.caucus
    }
    lawmakerVoteWithDemCaucus(vote, lawmaker) {
        // assumes caucus vote has been pre-calculated
        const lawmakerVote = this.getLawmakerVote(vote, lawmaker)
        return lawmakerVote === vote.demCaucus.caucus
    }
    lawmakerVoteWithMajority(vote, lawmaker) {
        // assumes result is 'yes' / 'no'
        const lawmakerVote = this.getLawmakerVote(vote, lawmaker)
        // console.log(lawmaker.name, lawmakerVote, '\n Majority',
        //     vote.result, '\n', vote.votes.map(d => ({name: d.voter_name, opt: d.option}) ))
        return lawmakerVote === vote.result
    }
    lawmakerVoteWithParty(vote, lawmaker) {
        // assumes caucus vote has been pre-calculated
        const lawmakerVote = this.getLawmakerVote(vote, lawmaker)
        if (lawmaker.party === 'R') return (lawmakerVote === vote.gopCaucus.caucus)
        if (lawmaker.party === 'D') return (lawmakerVote === vote.demCaucus.caucus)
    }
    lawmakerVoteIdeologyScore(vote, lawmaker) {
        // see below for logic
        const lawmakerVote = this.getLawmakerVote(vote, lawmaker)
        const gopVote = vote.gopCaucus.caucus
        const demVote = vote.demCaucus.caucus

        let partyFactor = (lawmaker.party === 'D') ? -1 : 1;

        // handle absent votes
        if ((lawmakerVote !== 'yes') && (lawmakerVote !== 'no')) return 0
       
        if (gopVote === demVote) { // non-disputed vote
            if (gopVote === lawmakerVote) return partyFactor * 0 // lawmaker agrees with both
            if (gopVote !== lawmakerVote) return partyFactor * 2 // lawmaker bucks both
        } else if (gopVote !== demVote) { // disputed vote
            const voteWithParty = this.lawmakerVoteWithParty(vote, lawmaker)
            if (voteWithParty) return partyFactor * 1
            else if (!voteWithParty) return partyFactor * -1
        }
    }

    // VOTE SUMMARY AGGREGATION FUNCTIONS
    percentVotesWithMajority(votes, lawmaker) {
        const numVotes = votes.length
        const absentVotes = votes.filter(vote => this.lawmakerVoteAbsent(vote, lawmaker)).length
        const votesWithMajority = votes.filter(vote => this.lawmakerVoteWithMajority(vote, lawmaker)).length
        return votesWithMajority / (numVotes - absentVotes)
    }
    percentVotesWithGopCaucus(votes, lawmaker) {
        const numVotes = votes.length
        const absentVotes = votes.filter(vote => this.lawmakerVoteAbsent(vote, lawmaker)).length
        const votesWithGop = votes.filter(vote => this.lawmakerVoteWithGopCaucus(vote, lawmaker)).length
        return votesWithGop / (numVotes - absentVotes)
    }
    percentVotesWithDemCaucus(votes, lawmaker) {
        const numVotes = votes.length
        const absentVotes = votes.filter(vote => this.lawmakerVoteAbsent(vote, lawmaker)).length
        const votesWithDems = votes.filter(vote => this.lawmakerVoteWithDemCaucus(vote, lawmaker)).length
        return votesWithDems / (numVotes - absentVotes)
    }
    // Ideology score - negative is farther left, positive farther right
    /* Logic
    - Both parties support
        - Lawmaker supports --> 0
        - Lawmakers opooses --> +2
    - Lawmaker party supports, other opposes
        - Lawmaker supports --> +1
        - Lawmaker opposes --> -1
    - Lawmaker party opposes, other supports
        - Lawmaker supports --> -1
        - Lawmaker opposes --> +1
    - Both parties oppose
        - Lawmaker supports --> +2
        - Lawmaker opposes --> 0
    */
    ideologyScore(votes, lawmaker) {
        return votes.reduce((acc, vote) => this.lawmakerVoteIdeologyScore(vote, lawmaker) + acc, 0)
    }
}

module.exports = Data