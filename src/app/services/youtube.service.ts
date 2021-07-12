import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CanalInterface, Item, Video } from '../interfaces/canal.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private nextToken = "";
  public items = 0;

  private url = 'https://www.googleapis.com/youtube/v3/playlistItems';

  constructor(private http: HttpClient) { }

  getVideosCanal(): Observable<Video[]>{
    let httpParametros : HttpParams = new HttpParams()
    .set("part", "snippet")
    .set("maxResults", "10")
    .set("playlistId", "PL1fuyEIcEu7BI_Mexrn8-WFC9k-GvucfG")
    .set("key", "AIzaSyAiO47Z0s6c_jb4979A6y07T2OKxEZ5_ds")
    .set("pageToken", this.nextToken);

    return this.http.get(`${ this.url }`, { params: httpParametros }).pipe(
      map((response: CanalInterface) => {
        this.nextToken = response.nextPageToken;
        this.items = response.pageInfo.totalResults;
        return response.items;
      }),
      map((response: Item[]) => {
        let data: Video[] = [];
        response.forEach(item => {
          data.push(item.snippet)
        })
        return data;
      })
    );
  }
}