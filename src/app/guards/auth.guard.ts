import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  
  public canActivate(): Observable<boolean> {
    return this.authService.validateToken().pipe(
      map((isValid: boolean) => {
        if (isValid) {
          return true; // Если токен валиден, разрешаем доступ
        } else {
          this.router.navigate(['/auth'], { replaceUrl: true }); // Если токен не валиден, перенаправляем
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/auth'], { replaceUrl: true }); // В случае ошибки тоже перенаправляем
        return [false];
      })
    );
  }
}
