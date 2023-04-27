import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Iskills } from './../interfaces/iskills';
import { Iaboutme } from './../interfaces/iaboutme';
import { Ieducacion } from './../interfaces/ieducacion';
import { Iexperiencia } from './../interfaces/iexperiencia';
import { Iproyecto } from './../interfaces/iproyecto';
import { Isoftskills } from '../interfaces/isoftskills';

@Injectable({
	providedIn: 'root'
})
export class PortfolioService {

	// url = 'localhost:4200';
	
/* 	constructor( private http: HttpClient ) { }
	getdata(): Observable<any> {
		return this.http.get('./../../assets/data/data.json');
	}
}
 */

  url = 'localhost:4200/';

  // Headers para POST, PUT Y DELETE.
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });

  constructor(private http: HttpClient) {}
  getdata(): Observable<any> {
    console.log('getdata');
    return this.http.get('./../../assets/data/data.json');
  }
  // *********************************************************************
  // **************   |   METHOD'S GET ALL    | **************************
  // *********************************************************************

  obtenerDatosAboutMe(): Observable<Iaboutme> {
    console.log('ObtenerDatosAboutMe');
   // alert('obtenerDatosAboutMe');
    //return this.http.get('./../../assets/data/data.json');
    return this.http.get<Iaboutme>('./../../assets/data/data.json');
}

  obtenerDatosBanner(): Observable<any>{
    console.log("OBTENERDATOSBANNERX");
    return this.http.get('./../../assets/data/data.json');
  }
<<<<<<< HEAD
  obtenerDatosEducacion(): Observable<Ieducacion> {
    // obtenerDatosEducacion():Observable<any> {
      console.log('obtenerDatosEducacion');
     return this.http.get<Ieducacion>('./../../assets/data/data.json');
//return this.http.get<Ieducacion>(this.url + 'Educacion');
  }

  obtenerDatosExperiencia(): Observable<Iexperiencia> {
=======
  obtenerDatosEducation(): Observable<Ieducacion> {
    // obtenerDatosEducation():Observable<any> {
      console.log('obtenerDatosEducation');
     return this.http.get<Ieducacion>('./../../assets/data/data.json');
//return this.http.get<Ieducacion>(this.url + 'education');
  }

  obtenerDatosExperience(): Observable<Iexperiencia> {
>>>>>>> cadfd36998eef0bb8f990e4175f1c3a1cf496a27
    console.log('obtenerDatosExperience');
    //return this.http.get<Iexperiencia>(this.url + 'Experience');
    return this.http.get<Iexperiencia>('./../../assets/data/data.json');
  }

<<<<<<< HEAD
  obtenerDatosProyecto(): Observable<Iproyecto> {
    console.log('obtenerDatosProyecto');
//    return this.http.get<Iproyecto>(this.url + 'Proyectos');
=======
  obtenerDatosProject(): Observable<Iproyecto> {
    console.log('obtenerDatosProject');
//    return this.http.get<Iproyecto>(this.url + 'Projects');
>>>>>>> cadfd36998eef0bb8f990e4175f1c3a1cf496a27
      return this.http.get<Iproyecto>('./../../assets/data/data.json');
}

  obtenerDatosSkills(): Observable<Iskills> {
    console.log("obtenerDatosSkill");
    //return this.http.get<Iskills>(this.url + 'skills');
    return this.http.get<Iskills>('./../../assets/data/data.json');
  }
  obtenerDatosSoftSkills(): Observable<Isoftskills> {
    console.log("obtenerDatosSoftSkills");
    //return this.http.get<Iskills>(this.url + 'skills');
    return this.http.get<Isoftskills>('./../../assets/data/data.json');
  }
  // *********************************************************************
  // **************   |   METHOD'S GET ONE    | **************************
  // *********************************************************************

  obtenerOneDatosAboutMe(id: number): Observable<any> {
    alert("obtenerundatoAboutMe");
    return this.http.get<any>(this.url + 'aboutme/' + id);
  }

<<<<<<< HEAD
  obtenerOneDatosEducacion(id: number): Observable<Ieducacion> {
    console.log("OBTENERDATOSEducacion",this.http.get<Ieducacion>(this.url + 'Educacion/' + id));
    return this.http.get<Ieducacion>(this.url + 'Educacion/' + id);
=======
  obtenerOneDatosEducation(id: number): Observable<Ieducacion> {
    console.log("OBTENERDATOSEDUCATION",this.http.get<Ieducacion>(this.url + 'Education/' + id));
    return this.http.get<Ieducacion>(this.url + 'Education/' + id);
>>>>>>> cadfd36998eef0bb8f990e4175f1c3a1cf496a27
  }

  obtenerOneDatosExperiencia(id: number): Observable<Iexperiencia> {
    return this.http.get<Iexperiencia>(this.url + 'Experiencia/' + id);
  }

<<<<<<< HEAD
  obtenerOneDatosProyecto(id: number): Observable<Iproyecto> {
    return this.http.get<Iproyecto>(this.url + 'Proyectos/' + id);
=======
  obtenerOneDatosProject(id: number): Observable<Iproyecto> {
    return this.http.get<Iproyecto>(this.url + 'Projects/' + id);
>>>>>>> cadfd36998eef0bb8f990e4175f1c3a1cf496a27
  }

  obtenerOneDatosSkill(id: number): Observable<Iskills> {
    return this.http.get<Iskills>(this.url + 'skills/' + id);
  }

  // *********************************************************************
  // **************   |   METHOD'S POST    | ******************************
  // *********************************************************************

  postAboutMe(AboutMe: any): Observable<any> {
    let AboutMeJSON = JSON.stringify(AboutMe);
    return this.http.post<any>(this.url + 'AboutMe', AboutMeJSON, {
      headers: this.headers,
    });
  }

<<<<<<< HEAD
  postEducacion(Educacion: Ieducacion): Observable<Ieducacion> {
    return this.http.post<Ieducacion>(this.url + 'Educacion', Educacion, {
=======
  postEducation(Education: Ieducacion): Observable<Ieducacion> {
    return this.http.post<Ieducacion>(this.url + 'Education', Education, {
>>>>>>> cadfd36998eef0bb8f990e4175f1c3a1cf496a27
      headers: this.headers,
    });
  }

  postExperiencia(Experiencia: Iexperiencia): Observable<Iexperiencia> {
    return this.http.post<Iexperiencia>(this.url + 'Experience', Experiencia, {
      headers: this.headers,
    });
  }

<<<<<<< HEAD
  postProyecto(Proyecto: Iproyecto): Observable<Iproyecto> {
    return this.http.post<Iproyecto>(this.url + 'Proyectos', Proyecto, {
=======
  postProject(Project: Iproyecto): Observable<Iproyecto> {
    return this.http.post<Iproyecto>(this.url + 'Projects', Project, {
>>>>>>> cadfd36998eef0bb8f990e4175f1c3a1cf496a27
      headers: this.headers,
    });
  }

  postSkill(Skill: Iskills): Observable<Iskills> {
    return this.http.post<Iskills>(this.url + 'skills', Skill, {
      headers: this.headers,
    });
  }

  // *********************************************************************
  // **************   |   METHOD'S PUT    | ******************************
  // *********************************************************************

  putAboutMe(AboutMe: any, id: Number): Observable<any> {
    return this.http.put<any>(this.url + 'AboutMe/' + id, AboutMe, {
      headers: this.headers,
    });
  }

  putExperiencia(Experiencia: Iexperiencia, i: Number): Observable<Iexperiencia> {
    return this.http.put<Iexperiencia>(
      this.url + 'Experience/' + i,
      Experiencia,
      { headers: this.headers }
    );
  }

<<<<<<< HEAD
  putEducacion(Educacion: Ieducacion, id: Number): Observable<Ieducacion> {
    return this.http.put<Ieducacion>(this.url + 'Educacion/' + id, Educacion, {
=======
  putEducation(Education: Ieducacion, id: Number): Observable<Ieducacion> {
    return this.http.put<Ieducacion>(this.url + 'Educacion/' + id, Education, {
>>>>>>> cadfd36998eef0bb8f990e4175f1c3a1cf496a27
      headers: this.headers,
    });
  }

<<<<<<< HEAD
  putProyecto(Proyecto: Iproyecto, id: Number): Observable<Iproyecto> {
=======
  putProject(Proyecto: Iproyecto, id: Number): Observable<Iproyecto> {
>>>>>>> cadfd36998eef0bb8f990e4175f1c3a1cf496a27
    return this.http.put<Iproyecto>(this.url + 'Proyecto/' + id, Proyecto, {
      headers: this.headers,
    });
  }

  putSkill(skill: Iskills, id: Number): Observable<Iskills> {
    return this.http.put<Iskills>(this.url + 'skills/' + id, skill, {
      headers: this.headers,
    });
  }

  // *********************************************************************
  // **************   |   METHOD'S DELETE    | ***************************
  // *********************************************************************

  deleteAboutMe(id: Number): Observable<any> {
    return this.http.delete<any>(this.url + 'AboutMe/' + id, {
      headers: this.headers,
    });
  }

<<<<<<< HEAD
  deleteEducacion(id: Number): Observable<Ieducacion> {
=======
  deleteEducation(id: Number): Observable<Ieducacion> {
>>>>>>> cadfd36998eef0bb8f990e4175f1c3a1cf496a27
    return this.http.delete<Ieducacion>(this.url + 'Educacion/' + id, {
      headers: this.headers,
    });
  }

  deleteExperiencia(id: Number): Observable<Iexperiencia> {
    return this.http.delete<Iexperiencia>(this.url + 'Experiencia/' + id, {
      headers: this.headers,
    });
  }

<<<<<<< HEAD
  deleteProyecto(id: Number): Observable<Iproyecto> {
    console.log("DELETE Proyecto:",this.url+"Proyecto/"+id);
=======
  deleteProject(id: Number): Observable<Iproyecto> {
    console.log("DELETE PROJECT:",this.url+"Proyecto/"+id);
>>>>>>> cadfd36998eef0bb8f990e4175f1c3a1cf496a27
    return this.http.delete<Iproyecto>(this.url + 'Proyecto/' + id, {
      headers: this.headers,
    });
  }

  deleteSkill(id: Number): Observable<Iskills> {
    return this.http.delete<Iskills>(this.url + 'skills/' + id, {
      headers: this.headers,
    });
  }
} 