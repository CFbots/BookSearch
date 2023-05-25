import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoverBookItem]'
})
export class HoverBookItemDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    
   }

  @HostListener('mouseover') onMoseOver(){
    this.renderer.setStyle(this.el.nativeElement, "background-color", "rgb(159, 244, 244)"); 
    this.changeColor('rgb(159, 244, 244)');
  }

  @HostListener('mouseout') onMoseOut(){
    this.renderer.setStyle(this.el.nativeElement, "background-color", "azure"); 
    this.changeColor('azure');
  }

  private changeColor(color: string){
    const itemInfo = this.el.nativeElement.querySelector('.item-info');
    if(itemInfo){
      this.renderer.setStyle(itemInfo, "background-color", color);
      const paragraphs = itemInfo.querySelectorAll('p');
      if(paragraphs){
        paragraphs.forEach((p: ElementRef)=>this.renderer.setStyle(p, "background-color", color))
      }
    }
  }
}