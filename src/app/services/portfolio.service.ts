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
  obtenerDatosEducacion(): Observable<Ieducacion> {
    // obtenerDatosEducation():Observable<any> {
      console.log('obtenerDatosEducation');
     return this.http.get<Ieducacion>('./../../assets/data/data.json');
//return this.http.get<Ieducacion>(this.url + 'education');
  }

  obtenerDatosExperience(): Observable<Iexperiencia> {
    console.log('obtenerDatosExperience');
    //return this.http.get<Iexperiencia>(this.url + 'Experience');
    return this.http.get<Iexperiencia>('./../../assets/data/data.json');
  }

  obtenerDatosProject(): Observable<Iproyecto> {
    console.log('obtenerDatosProject');
//    return this.http.get<Iproyecto>(this.url + 'Projects');
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

  obtenerOneDatosEducacion(id: number): Observable<Ieducacion> {
    console.log("OBTENERDATOSEDUCATION",this.http.get<Ieducacion>(this.url + 'Education/' + id));
    return this.http.get<Ieducacion>(this.url + 'Educacion/' + id);
  }

  obtenerOneDatosExperiencia(id: number): Observable<Iexperiencia> {
    return this.http.get<Iexperiencia>(this.url + 'Experiencia/' + id);
  }

  obtenerOneDatosProject(id: number): Observable<Iproyecto> {
    return this.http.get<Iproyecto>(this.url + 'Projects/' + id);
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

  postEducacion(Education: Ieducacion): Observable<Ieducacion> {
    return this.http.post<Ieducacion>(this.url + 'Education', Education, {
      headers: this.headers,
    });
  }

  postExperiencia(Experiencia: Iexperiencia): Observable<Iexperiencia> {
    return this.http.post<Iexperiencia>(this.url + 'Experience', Experiencia, {
      headers: this.headers,
    });
  }

  postProject(Project: Iproyecto): Observable<Iproyecto> {
    return this.http.post<Iproyecto>(this.url + 'Projects', Project, {
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

  putEducacion(Education: Ieducacion, id: Number): Observable<Ieducacion> {
    return this.http.put<Ieducacion>(this.url + 'Educacion/' + id, Education, {
      headers: this.headers,
    });
  }

  putProject(Proyecto: Iproyecto, id: Number): Observable<Iproyecto> {
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

  deleteEducacion(id: Number): Observable<Ieducacion> {
    return this.http.delete<Ieducacion>(this.url + 'Educacion/' + id, {
      headers: this.headers,
    });
  }

  deleteExperiencia(id: Number): Observable<Iexperiencia> {
    return this.http.delete<Iexperiencia>(this.url + 'Experiencia/' + id, {
      headers: this.headers,
    });
  }

  deleteProject(id: Number): Observable<Iproyecto> {
    console.log("DELETE PROJECT:",this.url+"Proyecto/"+id);
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