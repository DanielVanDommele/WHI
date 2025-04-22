import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FileUploadEvent } from 'primeng/fileupload';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'whi';
}
