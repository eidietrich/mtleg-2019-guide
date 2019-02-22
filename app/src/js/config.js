export const IMPORTANT_ACTIONS = [
  
  {key: 'Introduced', color: '#ffffbf', sort: 2},
  /// COMMITTEE
  // routine procedural - yellow
  {key: 'First Reading', color: '#ffffbf', sort: 2, position: 1},
  {key: 'Referred to Committee', color: '#ffffbf', sort: 2},
  
  // hearing
  {key: 'Hearing', color: '#dfc27d', sort: 2},
  
  // strange procedural - purple (for now)
  // {key: 'Hearing Canceled', color: '#d8daeb', sort: 2},
  {key: 'Rereferred to Committee', color: '#d8daeb', sort: 2},

  // move forward - green
  // {key: 'Committee Report--Bill Passed', color: '#91cf60', sort: 0},
  {key: 'Committee Executive Action--Bill Passed', color: '#91cf60', sort: 0},
  // {key: 'Committee Report--Bill Passed as Amended', color: '#91cf60', sort: 0},
  {key: 'Committee Executive Action--Bill Passed as Amended', color: '#91cf60', sort: 0},
  // {key: 'Committee Report--Bill Concurred', color: '#91cf60', sort: 0},
  {key: 'Committee Executive Action--Bill Concurred', color: '#91cf60', sort: 0},
  {key: 'Committee Executive Action--Bill Concurred as Amended', color: '#91cf60', sort: 0},
  
  // dead - red
  {key: 'Tabled in Committee', color: '#fc8d59', sort: 1},
  {key: 'Bill Not Heard at Sponsor\'s Request', color: '#fc8d59', sort: 1},
  {key: 'Bill Withdrawn per House Rule H30-50(3)(b)', color: '#fc8d59', sort: 1},
  {key: 'Committee Executive Action--Bill Not Passed', color: '#fc8d59', sort: 1},
  
  // NON-COMMITTEE
  // Procedural
  
  {key: 'Transmitted to Senate', color: '#ffffbf', sort: 2},
  {key: 'Transmitted to House', color: '#ffffbf', sort: 2},
  {key: 'Transmitted to Governor', color: '#ffffbf', sort: 2},
  // {key: 'Scheduled for 2nd Reading', color: '#ffffbf', sort: 2},
  // {key: 'Scheduled for 3rd Reading', color: '#ffffbf', sort: 2},
  // {key: '2nd Reading Pass Consideration', color: '#ffffbf', sort: 2},
  // {key: '2nd Reading Passed Consideration', color: '#ffffbf', sort: 2},
  {key: 'Reconsidered Previous Action; Remains in 3rd Reading Process', color: '#ffffbf', sort: 2},
  {key: 'Taken from 2nd Reading; Rereferred to Committee', color: '#ffffbf', sort: 2},
  {key: 'Returned to House with Amendments', color: '#ffffbf', sort: 2},
  {key: 'Taken from Table in Committee', color: '#ffffbf', sort: 2},
  {key: 'Motion Failed', color: '#ffffbf', sort: 2},
  {key: "Reconsidered Previous Action; Remains in 2nd Reading Process", color: '#ffffbf', sort: 2},
  
  // amendment - purple
  {key: '2nd Reading Motion to Amend Carried', color: '#d8daeb', sort: 2},
  {key: '2nd Reading Motion to Amend Failed', color: '#d8daeb', sort: 2},
  
  // move forward
  {key: '2nd Reading Passed', color: '#91cf60', sort: 0},
  {key: '2nd Reading Passed as Amended', color: '#91cf60', sort: 0},
  {key: '3rd Reading Passed', color: '#91cf60', sort: 0},
  {key: '2nd Reading Concurred', color: '#91cf60', sort: 0},
  {key: '2nd Reading Concurred as Amended', color: '#91cf60', sort: 0},
  {key: '2nd Reading Senate Amendments Concurred', color: '#91cf60', sort: 0},
  {key: '3rd Reading Concurred', color: '#91cf60', sort: 0},
  {key: '3rd Reading Pass Consideration', color: '#91cf60', sort: 0},
  {key: '3rd Reading Passed as Amended by Senate', color: '#91cf60', sort: 0},
  {key: 'Signed by Governor', color: '#91cf60', sort: 0},
  {key: 'Signed by President', color: '#91cf60', sort: 0},
  {key: 'Chapter Number Assigned', color: '#91cf60', sort: 0},
  {key: 'Taken from Committee; Placed on 2nd Reading', color: '#91cf60', sort: 0},
  
  
  // death
  {key: '2nd Reading Indefinitely Postponed', color: '#fc8d59', sort: 0},
  {key: '2nd Reading Not Passed', color: '#fc8d59', sort: 0},
  {key: '2nd Reading Not Concurred', color: '#fc8d59', sort: 0},
  {key: '2nd Reading Pass Motion Failed', color: '#fc8d59', sort: 0},
  {key: '2nd Reading Pass as Amended Motion Failed', color: '#fc8d59', sort: 0},
  {key: '3rd Reading Failed', color: '#fc8d59', sort: 0},
  {key: 'Adverse Committee Report Adopted', color: '#fc8d59', sort: 0},
  {key: 'Committee Vote Failed; Remains in Committee', color: '#fc8d59', sort: 0},
  
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
    "Committee Report--Bill Passed",
    "Committee Report--Bill Concurred",
    "Committee Report--Bill Passed as Amended",
    "Clerical Corrections Made - New Version Available",
    "Committee Report--Bill Concurred as Amended",
    "Committee Report--Bill Not Passed"
    
  ]