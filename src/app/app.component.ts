import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'messenger';

  public constructor(private router: Router) {}

  public ngOnInit(): void {
    this.router.navigate(['/auth']);
  }
}
