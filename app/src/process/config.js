// Needs to be commonJs not ES5 module format b/c node script references it

module.exports.KEY_BILLS = [
  'HB 2',
  'HB 5',
  'HB 21',
  'HB 658',
  'HB 661',
  'HB 694',
  'HB 652',
  'SB 338',
  'HB 318',
  'HB 575',
  'HB 302',
  'SB 217',
  'HB 332',
  'HB 290',
  'HB 553',
  'HB 159',
  'HB 175',
  'HB 293',
  'SB 266',
  'HB 219',
  'SB 331'
]

module.exports.BILL_STATUSES = [
  
  {key: 'In First House--Introduced', label: 'Introduced', color: '#ffffbf'},
  {key: 'In First House Committee--Nontabled', label: 'In first committee', color: '#ffffbf'},
  
  {key: 'In First House--Out of Committee', label: 'Thru first committee', color: '#ffffbf'},
  {key: 'In First House--Through 2nd Reading', label: 'Passed first chamber', color: '#ffffbf'},
  {key: 'Transmitted to Second House', label: 'Passed first chamber', color: '#ffffbf'},
  {key: 'In Second House Committee--Nontabled', label: 'Passed first chamber', color: '#ffffbf'},
  {key: 'In Second House--Out of Committee', label: 'Passed first chamber', color: '#ffffbf'},

  {key: 'Returned to First House with Second House Amendments', label: 'Passed both chambers', color: '#ffffbf'},
  {key: 'In Second House--Through 2nd Reading', label: 'Passed both chambers', color: '#ffffbf'},
  {key: 'In Second House--Through 3rd Reading', label: 'Passed both chambers', color: '#ffffbf'},

  {key: 'Passed By Legislature--Enrolling and Final Preparation Process', label: 'Passed both chambers', color: '#ffffbf'},
  {key: 'In Process to Consider Second House Amendments', label: 'Passed both chambers', color: '#ffffbf'},
  {key: 'In Conference or Free Conference Committee Process', label: 'Passed both chambers', color: '#ffffbf'},
  {key: 'Transmitted to Governor', label: 'Passed both chambers', color: '#ffffbf'},

  {key: 'Returned With Governor\'s Proposed Amendments or Line Item Veto', label: 'Passed both chambers', color: '#ffffbf'},
  {key: 'In Process to Consider Governor\'s Proposed Amendments or Line Item Veto', label: 'Passed both chambers', color: '#ffffbf'},

  {key: 'In Process to Attempt Override of Governor \'s Veto', label: 'Veto override vote in progress', color: '#ffffbf'},

  {key: 'In First House Committee--Tabled', label: 'Tabled', color: '#fc8d59'},
  {key: 'In Second House Committee--Tabled', label: 'Tabled', color: '#fc8d59'},
  {key: 'Probably Dead', label: 'Probably Dead', color: '#fc8d59'},

  {key: 'Became Law', label: 'Became Law', color: '#91cf60'},
]

module.exports.LEG_NAME_CLEANING = {
  // for cleaning inconsistent names in LAWS votes records
  'Tempel, Russel (Russ)' : 'Tempel, Russel',
  'Tempel, Russel ': 'Tempel, Russel',
  'McClafferty, Edith (Edie)' : 'McClafferty, Edith',
  'McClafferty, Edith ': 'McClafferty, Edith',
  'Lenz, Dennis R.' : 'Lenz, Dennis',
  'Morigeau, Shane A.' : 'Morigeau, Shane',
  'Kary, Douglas (Doug)' : 'Kary, Douglas',
  'Kary, Douglas ': 'Kary, Douglas',
  'Salomon, Daniel R.' : 'Salomon, Daniel',
  'Sesso, Jon C.' : 'Sesso, Jon',
  'Welborn, Jeffrey W.' : 'Welborn, Jeffrey',
  'MacDonald, Margaret (Margie)' : 'MacDonald, Margaret',
  'MacDonald, Margaret  ': 'MacDonald, Margaret',
  'Harvey, Derek J.' : 'Harvey, Derek',
  'Krautter, Joel G.' : 'Krautter, Joel',
  'Loge, Denley M.' : 'Loge, Denley',
  'Runningwolf, Tyson T.' : 'Runningwolf, Tyson',
  'Shaw, Ray L.' : 'Shaw, Ray',
  'Small, Jason D.' : 'Small, Jason',
  'Holmlund, Kenneth L.' : 'Holmlund, Kenneth',
  'Moore, Frederick (Eric)' : 'Moore, Frederick',
  'Moore, Frederick ': 'Moore, Frederick',
  'Fitzgerald, Ross H.' : 'Fitzgerald, Ross',
  'Ellsworth, Jason W.' : 'Ellsworth, Jason',
  'Galloway, Lola' : 'Sheldon-Galloway, Lola',
  // post-session scrape
  ' Barrett, Dick': 'Barrett, Dick',
  ' Blasdel, Mark': 'Blasdel, Mark',
  ' Cohenour, Jill': 'Cohenour, Jill',
  ' Gillespie, Bruce': 'Gillespie, Bruce',
  ' Hoven, Brian': 'Hoven, Brian',
  ' McClafferty, Edith (Edie)': 'McClafferty, Edith',
  ' Phillips, Mike': 'Phillips, Mike',
  ' Pomnichowski, JP': 'Pomnichowski, JP',
  ' Richmond, Tom': 'Richmond, Tom',
  ' Tempel, Russel (Russ)': 'Tempel, Russel',
  ' Webb, Roger': 'Webb, Roger',
  'Welborn, Jeffery': 'Welborn, Jeffrey',


  // for 2017
  'Stewart Peregoy, Sharon': 'Stewart-Peregoy, Sharon',
  'Kipp, George G.': 'Kipp, George',
  'Jones, Donald W.': 'Jones, Donald',
  'Knokey, Jon A.': 'Knokey, Jon',
}


// subjects includes keys for vote requirements
// NOT IMPLEMENTED
module.exports.BILL_SUBJECTS = [
  {key: 'Constitutional Amendment Proposals', voteThresholdDescription: '2/3 of entire legislature', voteThreshold: 0.667},
  {key: 'Debt, Creation of State', voteThresholdDescription: '2/3 of each house', voteThreshold: 0.667},
  // non-exhaustive
]
  
module.exports.IMPORTANT_ACTIONS = [
  // procedural - yellow
  {key: 'Introduced', color: '#ffffbf', glyph: 'Intro', status: 'Pending',},
  {key: 'First Reading', color: '#ffffbf', glyph: '1st', position: 1, status: 'Pending',},
  {key: 'Referred to Committee', color: '#ffffbf', glyph: '→Cmt', status: 'Pending',},
  {key: 'Rereferred to Committee', color: '#ffffbf', glyph: '↩Cmt', status: 'Pending',},

  // committee reports
  {key: 'Committee Report--Bill Passed', color: '#ffffbf', glyph: '→Floor', status: 'Pending',},
  {key: 'Committee Report--Bill Passed as Amended', color: '#ffffbf', glyph: '→Floor', status: 'Pending',},
  {key: 'Committee Report--Bill Concurred as Amended', color: '#ffffbf', glyph: '→Floor', status: 'Pending',},
  {key: 'Committee Report--Bill Concurred', color: '#ffffbf', glyph: '→Floor', status: 'Pending',},
  
  // hearing
  {key: 'Hearing', color: '#dfc27d', glyph: 'Hear', status: 'Pending',},
  
  // committee action - move forward
  {key: 'Committee Executive Action--Bill Passed', color: '#91cf60', glyph: '✓Cmt', status: 'Pending',},
  {key: 'Committee Executive Action--Bill Passed as Amended', color: '#91cf60', glyph: 'ΔCmt', status: 'Pending',},
  {key: 'Committee Executive Action--Bill Concurred', color: '#91cf60', glyph: '✓Cmt', status: 'Pending',},
  {key: 'Committee Executive Action--Bill Concurred as Amended', color: '#91cf60', glyph: 'ΔCmt', status: 'Pending',},
  // committee action - kill/stall
  {key: 'Tabled in Committee', color: '#fc8d59', glyph: '↓Cmt', status: 'Tabled',},
  {key: 'Committee Executive Action--Bill Not Concurred', color: '#fc8d59', glyph: '✗Cmt', status: 'Tabled',},
  {key: 'Bill Not Heard at Sponsor\'s Request', color: '#fc8d59', glyph: '✗Spn', status: 'Probably Dead',},
  {key: 'Bill Withdrawn per House Rule H30-50(3)(b)', color: '#fc8d59', glyph: '✗Spn', status: 'Probably Dead',},
  {key: 'Committee Executive Action--Bill Not Passed', color: '#fc8d59', glyph: '✗Cmt', status: 'Probably Dead',},
  
  // blasting
  {key: 'Taken from Committee; Placed on 2nd Reading', color: '#ffffbf',  glyph: '↑Floor', status: '',},

  // NON-COMMITTEE
  // Procedural
  {key: 'Transmitted to Senate', color: '#66c2a5', glyph: '→Sen', status: 'Pending',},
  {key: 'Transmitted to House', color: '#66c2a5', glyph: '→House', status: 'Pending',},
  {key: 'Transmitted to Governor', color: '#66c2a5', glyph: '→Gov', status: 'Pending',},
  {key: 'Returned to House with Amendments', color: '#66c2a5', glyph: '↩House', status: 'Pending',},
  {key: 'Returned to Senate with Amendments', color: '#66c2a5', glyph: '↩Sen', status: 'Pending',},
  {key: 'Conference Committee Appointed', color: '#66c2a5', glyph: '→Conf', status: 'Pending',},
  {key: 'Free Conference Committee Appointed', color: '#66c2a5', glyph: '→Conf', status: 'Pending',},

  {key: 'Conference Committee Report Received', color: '#ffffbf', glyph: 'Conf', status: 'Pending',},
  {key: 'Free Conference Committee Report Received', color: '#ffffbf', glyph: 'Conf', status: 'Pending',},

  {key: 'Taken from Table in Committee', color: '#ffffbf', glyph: '↑', status: 'Pending',},
  {key: 'Motion Failed', color: '#ffffbf', glyph: '', status: 'Pending',},
  {key: 'Reconsidered Previous Action; Remains in 2nd Reading Process', glyph: '', color: '#ffffbf', status: 'Pending',},
  {key: 'Reconsidered Previous Action; Placed on 2nd Reading', glyph: '', color: '#ffffbf', status: 'Pending',},

  // floor amendment
  {key: '2nd Reading Motion to Amend Carried', color: '#ffffbf', glyph: 'Δ', status: 'Pending',},
  {key: '2nd Reading Motion to Amend Failed', color: '#ffffbf', glyph: '◇', status: 'Pending',},
  
  // move forward
  {key: '2nd Reading Passed', color: '#91cf60', glyph: '✓2nd', status: 'Pending',},
  {key: '2nd Reading Passed as Amended', color: '#91cf60', glyph: 'Δ2nd', status: 'Pending',},
  {key: '3rd Reading Passed', color: '#91cf60', glyph: '✓3rd', status: 'Pending',},
  {key: '2nd Reading Concurred', color: '#91cf60', glyph: '✓2nd', status: 'Pending',},
  {key: '2nd Reading Concurred as Amended', color: '#91cf60', glyph: '✓2nd', status: 'Pending',},
  {key: '2nd Reading Senate Amendments Concurred', color: '#91cf60', glyph: '✓2nd', status: 'Pending',},
  {key: '3rd Reading Concurred', color: '#91cf60', glyph: '✓3rd', status: 'Pending',},
  {key: '3rd Reading Pass Consideration', color: '#91cf60', glyph: '', status: 'Pending',},
  {key: '3rd Reading Passed as Amended by Senate', color: '#91cf60', glyph: '✓3rd', status: 'Pending',},
  {key: 'Signed by Governor', color: '#91cf60',  glyph: '✓Gov', status: 'Passed',},
  
  {key: '2nd Reading House Amendments Concurred', color: '#91cf60',  glyph: '✓2nd', status: '',},
  {key: '3rd Reading Passed as Amended by House', color: '#91cf60',  glyph: '✓3rd', status: '',},

  // death
  {key: '2nd Reading Indefinitely Postponed', color: '#fc8d59',  glyph: 'X', status: 'Probably Dead',},
  {key: '2nd Reading Not Passed', color: '#fc8d59',   glyph: '✗2nd', status: 'Probably Dead',},
  {key: '2nd Reading Not Passed as Amended', color: '#fc8d59',   glyph: '✗2nd', status: 'Probably Dead',},
  {key: '2nd Reading Not Concurred', color: '#fc8d59',   glyph: '✗2nd', status: 'Probably Dead',},
  {key: '2nd Reading Pass Motion Failed', color: '#fc8d59',   glyph: '✗2nd', status: 'Probably Dead',},
  {key: '2nd Reading Pass as Amended Motion Failed', color: '#fc8d59', glyph: '✗2nd', status: 'Probably Dead',},
  {key: '3rd Reading Failed', color: '#fc8d59', glyph: '✗3rd', status: 'Probably Dead',},
  {key: 'Adverse Committee Report Adopted', color: '#fc8d59',  glyph: '✗Cmt', status: 'Probably Dead',},
  {key: 'Committee Vote Failed; Remains in Committee', color: '#fc8d59', glyph: '', status: 'Probably Dead',},
  {key: '2nd Reading Concur Motion Failed', color: '#fc8d59', glyph: '', status: 'Probably Dead',},
  
  {key: '2nd Reading Senate Amendments Not Concurred', color: '#ffffbf', glyph: '✗2nd', status: 'Pending',},

  // conference committee - pass
  {key: '2nd Reading Conference Committee Report Adopted', color: '#91cf60', glyph: '✓Conf', status: '',},
  {key: '2nd Reading Free Conference Committee Report Adopted', color: '#91cf60', glyph: '✓Conf', status: '',},
  {key: '3rd Reading Conference Committee Report Adopted', color: '#91cf60', glyph: '✓Conf', status: '',},
  {key: '3rd Reading Free Conference Committee Report Adopted', color: '#91cf60', glyph: '✓Conf', status: '',},

  // conference committee - fail

  // Missed deadline
  {key: 'Missed Deadline for Appropriation Bill Transmittal', color: '#fc8d59',  glyph: '---', status: 'Probably Dead',},
  {key: 'Missed Deadline for General Bill Transmittal', color: '#fc8d59',  glyph: '---', status: 'Probably Dead',},
  {key: 'Missed Deadline for Referendum Proposal Transmittal', color: '#fc8d59',  glyph: '---', status: 'Probably Dead',},
  {key: 'Missed Deadline for Revenue Bill Transmittal', color: '#fc8d59',  glyph: '---', status: 'Probably Dead',},
  
  // Veto override
  {key: 'Veto Override Vote Mail Poll in Progress', color: '#ffffbf', glyph: '↩Leg', status: 'Probably Dead',},
  {key: 'Veto Override Failed in Legislature', color: '#fc8d59', glyph: '✗✗✗', status: 'Vetoed',},
  
  // Governor's amendments
  {key: 'Returned with Governor\'s Proposed Amendments', color: '#ffffbf', glyph: '↩Leg', status: 'Pending',},
  {key: 'Returned to House Concurred in Governor\'s Proposed Amendments', color: '#ffffbf', glyph: '↩House', status: '',},
  {key: 'Returned to Senate Concurred in Governor\'s Proposed Amendments', color: '#ffffbf', glyph: '↩Sen', status: '',},
  {key: 'Returned to House Not Concurred in Governor\'s Proposed Amendments', color: '#ffffbf', glyph: '↩House', status: '',},
  {key: 'Returned to Senate Not Concurred in Governor\'s Proposed Amendments', color: '#ffffbf', glyph: '↩Sen', status: '',},
  
  // gov amendments - process
  {key: 'Transmitted to House for Consideration of Governor\'s Proposed Amendments', color: '#ffffbf', glyph: '↩House', status: '',},
  {key: 'Transmitted to Senate for Consideration of Governor\'s Proposed Amendments', color: '#ffffbf', glyph: '↩Sen', status: '',},
  // gov amendments - pass
  {key: '2nd Reading Governor\'s Proposed Amendments Adopted', color: '#91cf60', glyph: '✓2nd', status: '',},
  {key: '3rd Reading Governor\'s Proposed Amendments Adopted', color: '#91cf60', glyph: '✓3rd', status: '',},
  // gov amendments - stall
  {key: '2nd Reading Governor\'s Proposed Amendments Adopt Motion Failed', color: '#ffffbf', glyph: '✗2nd', status: '',},
  {key: '2nd Reading Governor\'s Proposed Amendments Not Adopted', color: '#ffffbf', glyph: '✗2nd', status: '',},

  // FINAL OUTCOMES
  {key: 'Vetoed by Governor', color: '#fc8d59', glyph: '✗Gov', status: 'Vetoed',},
  {key: 'Died in Standing Committee', color: '#fc8d59', glyph: 'DEAD', status: 'Died in Committee',},
  {key: 'Died in Process', color: '#fc8d59', glyph: 'DEAD', status: 'Died in Process',},
  {key: 'Chapter Number Assigned', color: '#91cf60',  glyph: 'LAW', status: 'Passed',},
  {key: 'Filed with Secretary of State', color: '#91cf60',  glyph: '✓SOS', status: 'Passed',},
 
  // TODO: procedural stuff to sort out
  {key: '2nd Reading Conference Committee Report Adopt Motion Failed', color: '#ffffbf', glyph: '', status: '',},
  {key: '3rd Reading Not Passed as Amended by Senate', color: '#ffffbf', glyph: '', status: '',},
  {key: '3rd Reading Conference Committee Report Rejected', color: '#ffffbf', glyph: '', status: '',},
  {key: '2nd Reading House Amendments Concur Motion Failed', color: '#ffffbf', glyph: '', status: '',},
  {key: '2nd Reading House Amendments Concurred on Voice Vote', color: '#ffffbf', glyph: '', status: '',},
  {key: '2nd Reading House Amendments Not Concurred', color: '#ffffbf', glyph: '', status: '',},
  {key: '2nd Reading Indefinitely Postpone Motion Failed', color: '#ffffbf', glyph: '', status: '',},
  {key: '2nd Reading Not Concurred as Amended', color: '#ffffbf', glyph: '', status: '',},
  {key: 'Segregated from Committee of the Whole Report', color: '#ffffbf', glyph: '', status: '',},
  {key: '2nd Reading Concur as Amended Motion Failed', color: '#ffffbf', glyph: '', status: '',},
  {key: 'Reconsidered Previous Action; Remains in Committee', color: '#ffffbf', glyph: '', status: '',},
  {key: 'Free Conference Committee Dissolved', color: '#ffffbf', glyph: '', status: '',},
  {key: 'Taken from 3rd Reading; Placed on 2nd Reading', color: '#ffffbf',  glyph: '', status: '',},
  {key: 'Reconsidered Previous Action; Remains in 3rd Reading Process', color: '#ffffbf', glyph: '', status: '',},
  {key: 'Taken from 2nd Reading; Rereferred to Committee', color: '#ffffbf', glyph: '', status: '',},

  {key: 'Committee Executive Action--Resolution Adopted', color: '#ffffbf', glyph: '', status: '',},
  {key: 'Committee Executive Action--Resolution Adopted as Amended', color: '#ffffbf', glyph: '', status: '',},
  {key: 'Committee Report--Resolution Adopted', color: '#ffffbf', glyph: '', status: '',},
  {key: 'Committee Report--Resolution Adopted as Amended', color: '#ffffbf', glyph: '', status: '',},
  {key: 'Missed Deadline for Revenue Estimating Resolution Transmittal', color: '#ffffbf', glyph: '', status: '',},
  {key: 'Resolution Adopted', color: '#ffffbf', glyph: '', status: '',},
  {key: 'Rules Suspended to Accept Late Transmittal of Bill', color: '#ffffbf', glyph: '', status: '',},
]

module.exports.UNIMPORTANT_ACTIONS = [
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
    "Clerical Corrections Made - New Version Available",
    "Committee Report--Bill Not Passed",
    'Committee Report--Bill Not Concurred',
    'Veto Override Vote Mail Poll Letter Being Prepared',
    // 'Conference Committee Appointed',
    'Conference Committee Dissolved',
    
    'Motion Carried',
    'On Motion Rules Suspended',
    'Motion to Reconsider Failed',
    'Rules Suspended to Accept Late Return of Amended Bill',
    'Special Note',
  ]