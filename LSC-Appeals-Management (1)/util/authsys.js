const Discord = require('discord.js')
function authFind(member, returnOption = 1) {
  //defining the roles required for each auth level; except 9+
  const requiredfor0 = ['859161628388622346', '754914803155206224', '878109801446527017', '878112642252804156', '863956795365654548', '863956761978732554', '867216933526700052', '853838722414673940']
  const requiredfor1 = ['746643077707595806', '862463903979274250', '863957372892217354', '853763786430611506']
  const requiredfor2 = ['879179824692862976', '877003176363065464', '863959894519709716', '866047318779232276']
  const requiredfor3 = ['746643232254984232', '863960054176546846', '878778886161301514', '860686783448088626']
  const requiredfor4 = ['746643708950347787', '860686783448088626', '863960054176546846', '878778964557058108']
  const requiredfor5 = ['855845544144797726', '860686811130232843', '867153596792176671', '878778964557058108']
  const requiredfor6 = "413462464022446084" || "413462464022446084"
  const requiredfor7 = "413462464022446084"
  let authnumber = ''
  let authlevel = ''
  if (member.id === requiredfor7) {
    authnumber = 7
    authlevel = 'Bot Developer'
  } else if (member.id === requirefor6) {
    authnumber = 6
    authlevel = "Chief Justice"
  } else if (member.roles.cache.some(role => requiredfor5.includes(role.id))) {
    authnumber = 5
    authlevel = 'Sr. Appeals Council'
  } else if (member.roles.cache.some(role => requiredfor4.includes(role.id))) {
    authnumber = 4
    authlevel = 'Appeals Council'
  } else if (member.roles.cache.some(role => requiredfor3.includes(role.id))) {
    authnumber = 3
    authlevel = 'Server Security'
  } else if (member.roles.cache.some(role => requiredfor2.includes(role.id))) {
    authnumber = 2
    authlevel = 'Staff'
  } else if (member.roles.cache.some(role => requiredfor1.includes(role.id))) {
    authnumber = 1
    authlevel = "Member"
  } else if (member.roles.cache.some(role => requiredfor0.includes(role.id))) {
    authnumber = 0
    authlevel = 'Muted/Punished'
  } else {
    authnumber = null
    authlevel = 'this user does not have any authorisation level!'
  }
  if (returnOption === 3) {
    return authlevel
  } else if (returnOption === 2) {
    return `${authnumber}(${authlevel})`
  } else if (returnOption === 1) {
    return authnumber
  } else {
    throw {name : "AuthSystemError", message : `'${returnOption}' is not a valid returnOption.`}; 
  }
}

module.exports = { authFind }