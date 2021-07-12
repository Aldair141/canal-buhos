import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
import { Video } from '../../interfaces/canal.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styles: [
  ]
})
export class ChannelComponent implements OnInit {

  videos: Video[] = [];

  constructor(public ytServ: YoutubeService) { }

  ngOnInit(): void {
    this.listarVideos();
  }

  listarVideos(){
    this.ytServ.getVideosCanal().subscribe((response) => {
      this.videos.push(...response);
    });
  }

  verVideo(video: Video){
    Swal.fire({
      html: `<h4>${ video.title }</h4>
      <iframe width="100%"
                height="315"
                src="https://www.youtube.com/embed/${ video.resourceId.videoId }"
                frameborder="0" allow="accelerometer; autoplay;
                clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>`,
      allowOutsideClick: false
    });
    console.log(video);
  }

}