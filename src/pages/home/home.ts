import { Component, ViewChild, Renderer } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
//native metods
import { Camera, CameraOptions } from "@ionic-native/camera";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('myCanvas') canvas: any;
  canvasElement: any;
  lastX: number;
  lastY: number;

  imgFormulario:any;
  imgActivdad:any;
  imgDecomiso: any;
  imgDecomiso2: any;
  constructor(public navCtrl: NavController, private platform: Platform, public renderer: Renderer, private camera: Camera) {
    this.imgFormulario = {
      'url': 'assets/logo/image.png',
      'estado': false
    }
    this.imgActivdad = {
      'url': 'assets/logo/image.png',
      'estado': false
    }
    this.imgDecomiso = {
      'url': 'assets/logo/image.png',
      'estado': false
    }
    this.imgDecomiso2 = {
      'url': 'assets/logo/image.png',
      'estado': false
    }
  }

  ngAfterViewInit() {
    console.log(this.canvas);
    this.canvasElement = this.canvas.nativeElement;
    console.log(this.platform.width());

    this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + '');
    this.renderer.setElementAttribute(this.canvasElement, 'height', '200');

  }
  startDrawing(ev) {
    var canvasPosition = this.canvasElement.getBoundingClientRect();
    console.log(canvasPosition);
    console.log(canvasPosition.left);
    console.log(canvasPosition.right);

    this.lastX = ev.touches[0].pageX - canvasPosition.left;
    this.lastY = ev.touches[0].pageY - canvasPosition.top;
  }

  handleMove(ev) {
    var canvasPosition = this.canvasElement.getBoundingClientRect();

    let currentX = ev.touches[0].pageX - canvasPosition.left;
    let currentY = ev.touches[0].pageY - canvasPosition.top;
    let ctx = this.canvasElement.getContext('2d');
    ctx.beginPath();
    ctx.lineJoin = "round";
    ctx.moveTo(this.lastX, this.lastY);
    ctx.lineTo(currentX, currentY);
    ctx.closePath();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 5;
    ctx.stroke();

    this.lastX = currentX;
    this.lastY = currentY;
  }
  handleEnd(ev) {
  }

  takeFormulario(){
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.VIDEO,
      targetWidth: 900,
      targetHeight: 900,
      correctOrientation: true
    }
    this.camera.getPicture(options).then(imagedata=>{            
      this.imgFormulario = {
        'url': 'data:image/jpeg;base64,' + imagedata,
        'estado': true
      }
    })
  }

  deleteFormulario(imagen){
    this.imgFormulario = {
      'url': 'assets/logo/image.png',
      'estado': false
    }
  }

  deleteActividad(imagen) {
    this.imgActivdad = {
      'url': 'assets/logo/image.png',
      'estado': false
    }
  }

  deleteDecomiso(imagen) {
    this.imgDecomiso = {
      'url': 'assets/logo/image.png',
      'estado': false
    }
  }
  deleteDecomiso2(imagen) {
    this.imgDecomiso2 = {
      'url': 'assets/logo/image.png',
      'estado': false
    }
  }
  takeActividad() {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.VIDEO,
      targetWidth: 900,
      targetHeight: 900,
      correctOrientation: true
    }
    this.camera.getPicture(options).then(imagedata => {
      this.imgActivdad = {
        'url': 'data:image/jpeg;base64,' + imagedata,
        'estado': true
      }
    })
  }

  takeDecomiso() {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.VIDEO,
      targetWidth: 900,
      targetHeight: 900,
      correctOrientation: true
    }
    this.camera.getPicture(options).then(imagedata => {
      this.imgDecomiso = {
        'url': 'data:image/jpeg;base64,' + imagedata,
        'estado': true
      }
    })
  }

  takeDecomiso2() {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.VIDEO,
      targetWidth: 900,
      targetHeight: 900,
      correctOrientation: true
    }
    this.camera.getPicture(options).then(imagedata => {
      this.imgDecomiso2 = {
        'url': 'data:image/jpeg;base64,' + imagedata,
        'estado': true
      }
    })
  }
}
