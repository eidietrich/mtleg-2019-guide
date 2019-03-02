class Data {
    constructor(bills, votes, lawmakers) {
        this.bills = bills
        this.votes = votes
        this.lawmakers = lawmakers

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

    // VOTE SUMMARY AGGREGATION FUNCTIONS
    percentVotesWithMajority(votes, lawmaker) {
        const numVotes = votes.length
        const votesWithMajority = votes.filter(vote => this.lawmakerVoteWithMajority(vote, lawmaker)).length
        return votesWithMajority / numVotes
    }
    percentVotesWithGopCaucus(votes, lawmaker) {
        const numVotes = votes.length
        const votesWithGop = votes.filter(vote => this.lawmakerVoteWithGopCaucus(vote, lawmaker)).length
        return votesWithGop / numVotes
    }
    percentVotesWithDemCaucus(votes, lawmaker) {
        const numVotes = votes.length
        const votesWithDems = votes.filter(vote => this.lawmakerVoteWithDemCaucus(vote, lawmaker)).length
        return votesWithDems / numVotes
    }
}

module.exports = Data