"use strict";(self.webpackChunkclinica=self.webpackChunkclinica||[]).push([[830],{1830:(P,p,n)=>{n.r(p),n.d(p,{EspecialistaPerfilModule:()=>E});var l=n(8583),h=n(7202),i=n(639),m=n(5058),u=n(9726),f=n(2780),r=n(665);function _(e,s){if(1&e){const o=i.EpF();i.TgZ(0,"div",6),i.TgZ(1,"input",7),i.NdJ("change",function(){return i.CHM(o),i.oxw().setupHorarios()})("ngModelChange",function(t){return i.CHM(o),i.oxw().especialidad=t}),i.qZA(),i.TgZ(2,"label",8),i._uU(3),i.qZA(),i.qZA()}if(2&e){const o=s.$implicit,a=i.oxw();i.xp6(1),i.Q6J("ngModel",a.especialidad)("value",o)("id",o.nombre),i.xp6(1),i.Q6J("for",o.nombre),i.xp6(1),i.hij(" ",o.nombre," ")}}function S(e,s){if(1&e){const o=i.EpF();i.TgZ(0,"div"),i.TgZ(1,"label",11),i.TgZ(2,"input",12),i.NdJ("click",function(){const c=i.CHM(o).$implicit;return i.oxw(2).handleHorario(c,"sabado")}),i.qZA(),i._uU(3),i.qZA(),i.qZA()}if(2&e){const o=s.$implicit,a=i.oxw(2);i.xp6(2),i.Q6J("checked",a.horariosSeleccionadosSabado.includes(o)),i.xp6(1),i.hij(" ",o," ")}}function g(e,s){if(1&e){const o=i.EpF();i.TgZ(0,"div"),i.TgZ(1,"h3"),i._uU(2,"Horarios Sabado"),i.qZA(),i.TgZ(3,"button",9),i.NdJ("click",function(){return i.CHM(o),i.oxw().seleccionar("sabado")}),i._uU(4,"Seleccionar todos"),i.qZA(),i.YNc(5,S,4,2,"div",10),i.qZA()}if(2&e){const o=i.oxw();i.xp6(5),i.Q6J("ngForOf",o.horariosSabado)}}function b(e,s){if(1&e){const o=i.EpF();i.TgZ(0,"div"),i.TgZ(1,"label",11),i.TgZ(2,"input",12),i.NdJ("click",function(){const c=i.CHM(o).$implicit;return i.oxw(2).handleHorario(c,"semana")}),i.qZA(),i._uU(3),i.qZA(),i.qZA()}if(2&e){const o=s.$implicit,a=i.oxw(2);i.xp6(2),i.Q6J("checked",a.horariosSeleccionadosSemana.includes(o)),i.xp6(1),i.hij(" ",o," ")}}function v(e,s){if(1&e){const o=i.EpF();i.TgZ(0,"div"),i.TgZ(1,"h3"),i._uU(2,"Horarios Semana"),i.qZA(),i.TgZ(3,"button",9),i.NdJ("click",function(){return i.CHM(o),i.oxw().seleccionar("semana")}),i._uU(4,"Seleccionar todos"),i.qZA(),i.YNc(5,b,4,2,"div",10),i.qZA()}if(2&e){const o=i.oxw();i.xp6(5),i.Q6J("ngForOf",o.horariosSemana)}}function x(e,s){if(1&e){const o=i.EpF();i.TgZ(0,"div",13),i.TgZ(1,"button",14),i.NdJ("click",function(){return i.CHM(o),i.oxw().updateDisponibilidad()}),i._uU(2,"Confirmar disponibilidad horaria"),i.qZA(),i.qZA()}}const Z=[{path:"",component:(()=>{class e{constructor(o,a){this.auth=o,this.storeService=a,this.especialista=this.auth.getUser,this.horariosSeleccionadosSabado=[],this.horariosSeleccionadosSemana=[]}ngOnInit(){}seleccionar(o){"sabado"==o?this.horariosSeleccionadosSabado=[...this.horariosSabado]:this.horariosSeleccionadosSemana=[...this.horariosSemana]}handleHorario(o,a){"sabado"==a?this.horariosSeleccionadosSabado=this.horariosSeleccionadosSabado?this.horariosSeleccionadosSabado.includes(o)?this.horariosSeleccionadosSabado.filter(t=>t!=o):[...this.horariosSeleccionadosSabado,o]:[o]:this.horariosSeleccionadosSemana=this.horariosSeleccionadosSemana?this.horariosSeleccionadosSemana.includes(o)?this.horariosSeleccionadosSemana.filter(t=>t!=o):[...this.horariosSeleccionadosSemana,o]:[o]}formatNumb(o){return o<10?`0${o}`:o}hFormater(o,a){let t=[];for(let c=0;c<60*o;c+=a){const d=this.formatNumb(c%60),A=this.formatNumb(8+Math.floor(c/60));t=[...t,`${A}:${d}hs`]}return t}setupHorarios(){const o=this.especialista.especialidad.find(a=>a.nombre==this.especialidad.nombre);this.horariosSeleccionadosSabado=(null==o?void 0:o.disponibilidadSabado)||[],this.horariosSeleccionadosSemana=(null==o?void 0:o.disponibilidadSemana)||[],this.especialidad&&(this.horariosSabado=this.hFormater(6,this.especialidad.duracionTurno),this.horariosSemana=this.hFormater(11,this.especialidad.duracionTurno))}updateDisponibilidad(){this.especialidad.disponibilidadSabado=this.horariosSeleccionadosSabado||[],this.especialidad.disponibilidadSemana=this.horariosSeleccionadosSemana||[];const o=Object.assign({},this.especialista);o.especialidad=o.especialidad.map(a=>a.nombre==this.especialidad.nombre?this.especialidad:a),this.storeService.UpdateUsuario(this.especialista.uid,o)}}return e.\u0275fac=function(o){return new(o||e)(i.Y36(m.e),i.Y36(u.TM))},e.\u0275cmp=i.Xpm({type:e,selectors:[["app-especialista-perfil"]],decls:13,vars:4,consts:[[1,"row","mt-5","mb-5","shadow","p-5"],[1,"col-4"],["class","form-check",4,"ngFor","ngForOf"],[1,"col-3"],[4,"ngIf"],["class","col-3 mt-4",4,"ngIf"],[1,"form-check"],["type","radio","name","especialidad",1,"form-check-input",3,"ngModel","value","id","change","ngModelChange"],[1,"form-check-label",3,"for"],[1,"btn","btn-info",3,"click"],[4,"ngFor","ngForOf"],[1,"d-flex","align-items-center",2,"height","25px"],["type","checkbox",1,"m-3",3,"checked","click"],[1,"col-3","mt-4"],[1,"btn","btn-primary",3,"click"]],template:function(o,a){1&o&&(i._UZ(0,"app-perfil"),i.TgZ(1,"div",0),i.TgZ(2,"div",1),i.TgZ(3,"h4"),i._uU(4,"Disponibilidad Horiaria"),i.qZA(),i.TgZ(5,"h5"),i._uU(6,"Especialidad"),i.qZA(),i.YNc(7,_,4,5,"div",2),i.qZA(),i.TgZ(8,"div",3),i.YNc(9,g,6,1,"div",4),i.qZA(),i.TgZ(10,"div",3),i.YNc(11,v,6,1,"div",4),i.qZA(),i.YNc(12,x,3,0,"div",5),i.qZA()),2&o&&(i.xp6(7),i.Q6J("ngForOf",a.especialista.especialidad),i.xp6(2),i.Q6J("ngIf",a.horariosSabado),i.xp6(2),i.Q6J("ngIf",a.horariosSemana),i.xp6(1),i.Q6J("ngIf",(null==a.horariosSeleccionadosSemana?null:a.horariosSeleccionadosSemana.length)||(null==a.horariosSeleccionadosSabado?null:a.horariosSeleccionadosSabado.length)))},directives:[f.k,l.sg,l.O5,r._,r.Fj,r.JJ,r.On],styles:[""]}),e})()}];let T=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=i.oAB({type:e}),e.\u0275inj=i.cJS({imports:[[h.Bz.forChild(Z)],h.Bz]}),e})();var C=n(7600);let E=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=i.oAB({type:e}),e.\u0275inj=i.cJS({imports:[[l.ez,C.p,r.u5,r.UX,T]]}),e})()}}]);