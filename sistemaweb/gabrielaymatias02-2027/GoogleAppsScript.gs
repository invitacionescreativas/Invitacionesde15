const SPREADSHEET_ID="TU_ID_DE_SPREADSHEET";
function doGet(){return ContentService.createTextOutput("OK")}
function doPost(e){
 try{
  const d=JSON.parse(e.postData.contents||"{}"),ss=SpreadsheetApp.openById(SPREADSHEET_ID),t=String(d.tipo||"");
  if(t==="asistencia") add_(ss,"ASISTENCIA",["Fecha","Invitación","Respuesta","Nombre","DNI","Cantidad","Mensaje"],[new Date(),d.invitacion||"",d.respuesta||"",d.nombre||"",d.dni||"",d.cantidad||"",d.mensaje||""]);
  else if(t==="menu") add_(ss,"MENU",["Fecha","Invitación","Nombre","Condición","Detalle"],[new Date(),d.invitacion||"",d.nombre||"",d.condicion||"",d.detalle||""]);
  else if(t==="cancion") add_(ss,"CANCIONES",["Fecha","Invitación","Nombre","Canción"],[new Date(),d.invitacion||"",d.nombre||"",d.cancion||""]);
  return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
 }catch(x){return ContentService.createTextOutput(JSON.stringify({ok:false,error:String(x)})).setMimeType(ContentService.MimeType.JSON)}
}
function add_(ss,n,h,r){let s=ss.getSheetByName(n);if(!s){s=ss.insertSheet(n);s.appendRow(h);s.setFrozenRows(1)}s.appendRow(r)}