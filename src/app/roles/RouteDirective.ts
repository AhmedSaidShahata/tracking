import {Directive, ElementRef, OnInit, Renderer} from '@angular/core';
import {AuthGuard} from "../guard/auth.guard";

@Directive({
  selector:"[appShowRoute]"
})
export class RouteDirective implements OnInit{
  constructor(private el: ElementRef ,
              private auth1:AuthGuard ,
              private renderer: Renderer) {




  }
  ngOnInit(){



    if (this.auth1 != null && this.auth1.getUser() != null &&
      this.auth1.getUser().role !=null &&this.auth1.getUser().role.Id == 3){
      this.el.nativeElement.style.display = "none";

    }

    // this.el.nativeElement.style.display = "none";

  }
}
