export const BILL_STATUSES = [
  {key: 'Pending', color: '#ffffbf'},
  {key: 'Tabled', color: '#fc8d59'},
  {key: 'Probably Dead', color: '#fc8d59'},
  {key: 'Passed', color: '#91cf60'},
]
  
export const IMPORTANT_ACTIONS = [
  
  {key: 'Introduced', color: '#ffffbf', glyph: 'Intro', sort: 2, status: 'Pending',},
  /// COMMITTEE
  // procedural - yellow
  {key: 'First Reading', color: '#ffffbf', glyph: '1st', sort: 2, position: 1, status: 'Pending',},
  {key: 'Referred to Committee', color: '#ffffbf', glyph: '→Cmt', sort: 2, status: 'Pending',},
  {key: 'Rereferred to Committee', color: '#ffffbf', glyph: '↩Cmt', sort: 2, status: 'Pending',},

  {key: 'Committee Report--Bill Passed', color: '#ffffbf', glyph: '→Floor', sort: 2, status: 'Pending',},
  {key: 'Committee Report--Bill Passed as Amended', color: '#ffffbf', glyph: '→Floor', sort: 2, status: 'Pending',},
  {key: 'Committee Report--Bill Concurred as Amended', color: '#ffffbf', glyph: '→Floor', sort: 2, status: 'Pending',},
  {key: 'Committee Report--Bill Concurred', color: '#ffffbf', glyph: '→Floor', sort: 2, status: 'Pending',},
  // {key: 'Committee Report--Bill Not Passed', color: '#fc8d59', glyph: '→Floor', sort: 1},
  
  // hearing
  {key: 'Hearing', color: '#dfc27d', glyph: 'Hear', sort: 2, status: 'Pending',},
  
  // move forward - green
  // {key: 'Committee Report--Bill Passed', color: '#91cf60', sort: 0},
  {key: 'Committee Executive Action--Bill Passed', color: '#91cf60', glyph: '✓Cmt', sort: 0, status: 'Pending',},
  // {key: 'Committee Report--Bill Passed as Amended', color: '#91cf60', sort: 0},
  {key: 'Committee Executive Action--Bill Passed as Amended', color: '#91cf60', glyph: 'ΔCmt', sort: 0, status: 'Pending',},
  // {key: 'Committee Report--Bill Concurred', color: '#91cf60', sort: 0},
  {key: 'Committee Executive Action--Bill Concurred', color: '#91cf60', glyph: '✓Cmt', sort: 0, status: 'Pending',},
  {key: 'Committee Executive Action--Bill Concurred as Amended', color: '#91cf60', glyph: 'ΔCmt', sort: 0, status: 'Pending',},
  
  // dead - red
  {key: 'Tabled in Committee', color: '#fc8d59', glyph: '↓Cmt', sort: 1, status: 'Tabled',},
  {key: 'Bill Not Heard at Sponsor\'s Request', color: '#fc8d59', glyph: '✗Spn', sort: 1, status: 'Probably Dead',},
  {key: 'Bill Withdrawn per House Rule H30-50(3)(b)', color: '#fc8d59', glyph: '✗Spn', sort: 1, status: 'Probably Dead',},
  {key: 'Committee Executive Action--Bill Not Passed', color: '#fc8d59', glyph: '✗Cmt', sort: 1, status: 'Probably Dead',},
  
  
  // NON-COMMITTEE
  // Procedural
  
  {key: 'Transmitted to Senate', color: '#66c2a5', glyph: '→Sen', sort: 2, status: 'Pending',},
  {key: 'Transmitted to House', color: '#66c2a5', glyph: '→House', sort: 2, status: 'Pending',},
  {key: 'Transmitted to Governor', color: '#66c2a5', glyph: '→Gov', sort: 2, status: 'Pending',},
  {key: 'Returned to House with Amendments', color: '#66c2a5', glyph: '↩House', sort: 2, status: 'Pending',},
  {key: 'Returned to Senate with Amendments', color: '#66c2a5', glyph: '↩Sen', sort: 2, status: 'Pending',},

  {key: 'Reconsidered Previous Action; Remains in 3rd Reading Process', color: '#ffffbf', glyph: '', sort: 2, status: 'Pending',},
  {key: 'Taken from 2nd Reading; Rereferred to Committee', color: '#ffffbf', glyph: '', sort: 2, status: 'Pending',},
  
  {key: 'Taken from Table in Committee', color: '#ffffbf', glyph: '↑', sort: 2, status: 'Pending',},
  {key: 'Motion Failed', color: '#ffffbf', glyph: '', sort: 2, status: 'Pending',},
  {key: "Reconsidered Previous Action; Remains in 2nd Reading Process", glyph: '', color: '#ffffbf', sort: 2, status: 'Pending',},
  
  // floor amendment
  {key: '2nd Reading Motion to Amend Carried', color: '#ffffbf', glyph: 'Δ', sort: 2, status: 'Pending',},
  {key: '2nd Reading Motion to Amend Failed', color: '#ffffbf', glyph: '◇', sort: 2, status: 'Pending',},
  
  // move forward
  {key: '2nd Reading Passed', color: '#91cf60', glyph: '✓2nd', sort: 0, status: 'Pending',},
  {key: '2nd Reading Passed as Amended', color: '#91cf60', glyph: 'Δ2nd', sort: 0, status: 'Pending',},
  {key: '3rd Reading Passed', color: '#91cf60', glyph: '✓3rd', sort: 0, status: 'Pending',},
  {key: '2nd Reading Concurred', color: '#91cf60', glyph: '✓2nd', sort: 0, status: 'Pending',},
  {key: '2nd Reading Concurred as Amended', color: '#91cf60', glyph: '✓2nd', sort: 0, status: 'Pending',},
  {key: '2nd Reading Senate Amendments Concurred', color: '#91cf60', glyph: '✓2nd', sort: 0, status: 'Pending',},
  {key: '3rd Reading Concurred', color: '#91cf60', glyph: '✓3rd', sort: 0, status: 'Pending',},
  {key: '3rd Reading Pass Consideration', color: '#91cf60', glyph: '', sort: 0, status: 'Pending',},
  {key: '3rd Reading Passed as Amended by Senate', color: '#91cf60', glyph: '✓3rd', sort: 0, status: 'Pending',},
  {key: 'Signed by Governor', color: '#91cf60',  glyph: '✓Gov', sort: 0, status: 'Passed',},
  // {key: 'Signed by President', color: '#91cf60',  glyph: '✓', sort: 0},
  {key: 'Chapter Number Assigned', color: '#91cf60',  glyph: 'LAW', sort: 0, status: 'Passed',},
 
  
  
  // death
  {key: '2nd Reading Indefinitely Postponed', color: '#fc8d59',  glyph: 'X', sort: 0, status: 'Probably Dead',},
  {key: '2nd Reading Not Passed', color: '#fc8d59',   glyph: '✗2nd', sort: 0, status: 'Probably Dead',},
  {key: '2nd Reading Not Passed as Amended', color: '#fc8d59',   glyph: '✗2nd', sort: 0, status: 'Probably Dead',},
  {key: '2nd Reading Not Concurred', color: '#fc8d59',   glyph: '✗2nd', sort: 0, status: 'Probably Dead',},
  {key: '2nd Reading Pass Motion Failed', color: '#fc8d59',   glyph: '✗2nd', sort: 0, status: 'Probably Dead',},
  {key: '2nd Reading Pass as Amended Motion Failed', color: '#fc8d59', glyph: '✗2nd', sort: 0, status: 'Probably Dead',},
  {key: '3rd Reading Failed', color: '#fc8d59', glyph: '✗3rd', sort: 0, status: 'Probably Dead',},
  {key: 'Adverse Committee Report Adopted', color: '#fc8d59',  glyph: '✗Cmt', sort: 0, status: 'Probably Dead',},
  {key: 'Committee Vote Failed; Remains in Committee', color: '#fc8d59', glyph: '', sort: 0, status: 'Probably Dead',},

  // ambiguous
  {key: 'Taken from Committee; Placed on 2nd Reading', color: '#91cf60',  glyph: '', sort: 0, status: 'Pending',},
  
]

export const UNIMPORTANT_ACTIONS = [
    "Draft Back for Redo",
    "Draft Back for Requester Changes",
    "Draft Delivered to Requester",
    "Draft On Hold",
    "Draft Ready for Delivery",
    "Draft Request Received",
    "Draft Taken Off Hold",
    "Draft Taken by Drafter",
    "Draft in Assembly",
    "Draft in Edit",
    "Draft in Final Drafter Review",
    "Draft in Input/Proofing",
    "Draft in Legal Review",
    "Draft to Drafter - Edit Review [CMD]",
    "Draft to Drafter - Edit Review [KWK]",
    "Draft to Drafter - Edit Review [SMH]",
    "Draft to Requester for Review",
    "Executive Director Final Review",
    "Executive Director Review",
    "Fiscal Note Printed",
    "Fiscal Note Probable",
    "Fiscal Note Received",
    "Fiscal Note Requested",
    "Fiscal Note Signed",
    "Fiscal Note Unsigned",
    "Pre-Introduction Letter Sent",
    "Printed - Enrolled Version Available",
    "Printed - New Version Available",
    "Returned from Enrolling",
    "Returned to House",
    "Returned to Senate",
    "Revised Fiscal Note Printed",
    "Revised Fiscal Note Received",
    "Revised Fiscal Note Requested",
    "Revised Fiscal Note Signed",
    "Scheduled for 2nd Reading",
    "Scheduled for 3rd Reading",
    "Scheduled for Executive Action",
    "Sent to Enrolling",
    "Signed by Speaker",
    "Signed by President",
    "Sponsor List Modified",
    "Sponsor Rebuttal to Fiscal Note Printed",
    "Sponsor Rebuttal to Fiscal Note Received",
    "Sponsor Rebuttal to Fiscal Note Requested",
    "Sponsor Rebuttal to Fiscal Note Signed",
    "Sponsors Engrossed",
    "Legal Review Note",
    "Bill Draft Text Available Electronically",
    "Introduced Bill Text Available Electronically",
    "Hearing Canceled",
    "2nd Reading Pass Consideration",
    "2nd Reading Passed Consideration",
    // redundant
    "Clerical Corrections Made - New Version Available",
    "Committee Report--Bill Not Passed",
  ]