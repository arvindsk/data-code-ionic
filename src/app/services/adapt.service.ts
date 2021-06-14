import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ParticipantStudy} from "../model/ParticipantStudy";
import {Participant} from "../model/Participant";

@Injectable({
  providedIn: 'root'
})
export class AdaptService {

  baseUri = environment.baseUri;

  constructor(private httpClient: HttpClient) {
  }

  public getQuestionnaire(questionnaireType: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    let params = new HttpParams();
    params = params.append('questionnaireType', questionnaireType);

    return this.httpClient.get<any>(this.baseUri + 'api/adapt/questionnaire/questionnaireType', {headers, params});
  }


  saveQuestionnaireAnswer(participantStudy: ParticipantStudy): Observable<string> {
    let headers = new HttpHeaders();

    headers = headers.append('Content-Type', 'application/json');
    const httpOptions = {headers};
    return this.httpClient.post<string>(
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

  public getParticipants(): Observable<Participant[]> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.httpClient.get<Participant[]>(this.baseUri + 'api/adapt/collect-data/get-all-participants', {headers});
  }

}
