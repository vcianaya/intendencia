import { Component, ViewChild, Renderer } from '@angular/core';
import { NavController, Platform, Content } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('myCanvas') canvas:any;

  canvasElement: any;
  lastX: number;
  lastY: number;
  constructor(public navCtrl: NavController, private platform: Platform, public renderer: Renderer) {

  }

  ngAfterViewInit(){
    console.log(this.canvas);
    this.canvasElement = this.canvas.nativeElement;
    console.log(this.platform.width());
    
    this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width()+'');
    this.renderer.setElementAttribute(this.canvasElement, 'height', '200');    

  }
  startDrawing(ev){
    var canvasPosition = this.canvasElement.getBoundingClientRect();
    console.log(canvasPosition);
    console.log(canvasPosition.left);
    console.log(canvasPosition.right);
    
    this.lastX = ev.touches[0].pageX - canvasPosition.left;
    this.lastY = ev.touches[0].pageY - canvasPosition.top;
  }

  handleMove(ev){
    var canvasPosition = this.canvasElement.getBoundingClientRect();    
    
    let currentX = ev.touches[0].pageX  - canvasPosition.left;
    let currentY = ev.touches[0].pageY  - canvasPosition.top;
    let ctx = this.canvasElement.getContext('2d');
    ctx.beginPath();
    ctx.lineJoin ="round";
    ctx.moveTo(this.lastX,this.lastY);
    ctx.lineTo(currentX,currentY);
    ctx.closePath();
    ctx.strokeStyle= '#000';
    ctx.lineWidth= 5;
    ctx.stroke();

    this.lastX = currentX;
    this.lastY = currentY;
   }
   handleEnd(ev){    
   }
}
