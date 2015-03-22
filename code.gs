function pull(toonName,realmName) {
  
    if(!toonName || !realmName) {      // Keeps blank rows blank instead of printing an error
   return ""
  }
  
  var toonJSON = UrlFetchApp.fetch("eu.battle.net/api/wow/character/"+realmName+"/"+toonName+"?fields=items");
  var toon = Utilities.jsonParse(toonJSON.getContentText());
  
  var classNameNum = toon.class;
  var className;
    
   switch (classNameNum) {
    case 1:
      className = "Warrior"
      break;
    case 2:
      className = "Paladin"
      break;
    case 3:
      className = "Hunter"
      break;
    case 4:
      className = "Rogue"
      break;
    case 5:
      className = "Priest"
      break;
    case 6:
      className = "DK"
      break;
    case 7:
      className = "Shaman"
      break;
    case 8:
      className = "Mage"
      break;
    case 9:
      className = "Warlock"
      break;
    case 10:
      className = "Monk"
      break;
    case 11:
      className = "Druid"
      break;
    default:
      className = "None"
  }
  
  var headId = toon.items.head.id;
  var headIlvl = toon.items.head.itemLevel;

  var shoulderId = toon.items.shoulder.id;
  var shoulderIlvl = toon.items.shoulder.itemLevel;

  var chestId = toon.items.chest.id;
  var chestIlvl = toon.items.chest.itemLevel;

  var handsId = toon.items.hands.id;
  var handsIlvl = toon.items.hands.itemLevel;

  var legsId = toon.items.legs.id;
  var legsIlvl = toon.items.legs.itemLevel;

  var arrayToCompare = [115585,115586,115587,115588,115589,  // Warlock          // Lists of each tier item ID per class
                        115580,115581,115582,115583,115584,  // Warrior
                        115565,115566,115567,115568,115569,  // Paladin
                        115545,115546,115547,115548,115549,  // Hunter
                        115570,115571,115572,115573,115574,  // Rogue
                        115560,115561,115562,115563,115564,  // Priest
                        115535,115536,115537,115538,115539,  // DK
                        115575,115576,115577,115578,115579,  // Shaman
                        115550,115551,115552,115553,115554,  // Mage
                        115555,115556,115557,115558,115559,  // Monk
                        115540,115541,115542,115543,115544]; // Druid

  var setInfo = new Array(                                                      
    (arrayToCompare.indexOf(headId) != -1 ? "Y " + "("+headIlvl+")" : "N"),      // Compares the item ID of the equipped item in each tier slot with the above array of IDs  
    (arrayToCompare.indexOf(shoulderId) != -1 ? "Y " + "("+shoulderIlvl+")" : "N"),
    (arrayToCompare.indexOf(chestId) != -1 ? "Y " + "("+chestIlvl+")" : "N"),
    (arrayToCompare.indexOf(handsId) != -1 ? "Y " + "("+handsIlvl+")" : "N"),
    (arrayToCompare.indexOf(legsId) != -1 ? "Y " + "("+legsIlvl+")" : "N"),
    toon.items.averageItemLevelEquipped, className
)
   
  return setInfo;
}
