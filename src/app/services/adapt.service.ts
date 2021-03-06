import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ParticipantStudy} from "../model/ParticipantStudy";
import {Participant} from "../model/Participant";
import {Summary} from "../model/Summary";
import {LoginRequest} from "../model/LoginRequest";
import {LoginResponse} from "../model/LoginResponse";

@Injectable({
  providedIn: 'root'
})
export class AdaptService {

  baseUri = environment.baseUri;

  constructor(private httpClient: HttpClient) {
  }

  public getQuestionnaire(questionnaireType: number): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    let params = new HttpParams();
    params = params.append('study_id', String(questionnaireType));

    return this.httpClient.get<any>(this.baseUri + 'api/adapt/questionnaire/questionnaireType', {headers, params});
  }


  saveQuestionnaireAnswer(participantStudy: ParticipantStudy): Observable<boolean> {
    let headers = new HttpHeaders();

    headers = headers.append('Content-Type', 'application/json');
    const httpOptions = {headers};
    return this.httpClient.post<boolean>(
      this.baseUri + 'api/adapt/questionnaire/saveQuestionnaireFilled',
      participantStudy,
      httpOptions
    );
  }

  getQuestionnaireAnswer(participantStudy: ParticipantStudy): Observable<ParticipantStudy> {
    let headers = new HttpHeaders();

    headers = headers.append('Content-Type', 'application/json');
    const httpOptions = {headers};
    return this.httpClient.post<ParticipantStudy>(
      this.baseUri + 'api/adapt/questionnaire/getQuestionnaireFilled',
      participantStudy,
      httpOptions
    );
  }

  public getParticipants(host : string): Observable<Participant[]> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.httpClient.post<Participant[]>(this.baseUri + 'api/adapt/collect-data/get-all-participants',
      host,
      {headers});
  }

  public loadParticipantStudyList(participant: Participant): Observable<ParticipantStudy[]> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.httpClient.post<ParticipantStudy[]>(this.baseUri + 'api/adapt/collect-data/get-participant-study-list',
      participant,
      {headers});
  }

  public getSummary(host: string): Observable<Summary> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.httpClient.post<Summary>(this.baseUri + 'api/adapt/summary/get-summary', host,{headers});
  }

  public login(loginRequest : LoginRequest): Observable<LoginResponse> {
    let headers = new HttpHeaders();

    headers = headers.append('Content-Type', 'application/json');
    const httpOptions = {headers};

    return this.httpClient.post<LoginResponse>(this.baseUri + 'api/adapt/login/loginuser', loginRequest, httpOptions);
  }

}
