import { Component, ViewChild, Renderer } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { ToastController } from "ionic-angular";
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
//services
import { OperativoService } from "../../services/operativo.service";
//native metods
import { Camera, CameraOptions } from "@ionic-native/camera";
import { Geolocation, GeolocationOptions } from "@ionic-native/geolocation";
import { LocationAccuracy } from '@ionic-native/location-accuracy';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [OperativoService]
})
export class HomePage {
  @ViewChild('myCanvas') canvas: any;
  canvasElement: any;
  lastX: number;
  lastY: number;
  validate: boolean;
  nro_formulario: number;
  nro_acta: number;
  nro_decomiso: number;
  observaciones: string;
  propietario:string;
  imgFormulario: any;
  imgActivdad: any;
  imgDecomiso: any;
  imgDecomiso2: any;
  lat: number;
  lng: number;
  constructor(public navCtrl: NavController, private platform: Platform, public renderer: Renderer, private camera: Camera, private operativoService: OperativoService, private geo: Geolocation, private locationAccuracy: LocationAccuracy, public toastCtrl: ToastController, public loadingCtrl: LoadingController, private alertCtrl: AlertController) {
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
    this.validate = false;
  }
  ionViewDidLoad() {
    this.getPosition();
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
          () => this.getPosition(),
        );
      }
    })
  }
  saveOperativo() {

    let alert = this.alertCtrl.create({
      title: 'Confirmar Registro',
      message: 'Esta seguro de enviar el formulario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Enviar',
          handler: () => {
            let loader = this.loadingCtrl.create({
              content: "Enviando ...",
            });
            loader.present();
            let imgFrm = this.imgFormulario.url.split(",");
            let imgAct = this.imgActivdad.url.split(",");
            let imgDec1 = this.imgDecomiso.url.split(",");
            let imgDec2 = this.imgDecomiso2.url.split(",");
            let dataUrl = this.canvasElement.toDataURL();
            let imgFirma = dataUrl.split(",");

            this.operativoService.register({
              'nro_formulario': this.nro_formulario,
              'nro_acta': this.nro_acta,
              'nro_decomiso': this.nro_decomiso,
              'observaciones': this.observaciones,
              'lat': this.lat,
              'lng': this.lng,
              'imgFormulario': imgFrm[1],
              'imgActividad': imgAct[1],
              'imgDecomiso': imgDec1[1],
              'imgDecomiso2': imgDec2[1],
              'imgFirma': imgFirma[1],
              'propietario':this.propietario
            }).subscribe(response => {
              loader.dismiss();
              this.limpiarFirma();
              let toast = this.toastCtrl.create({
                message: response,
                duration: 6000,
                position: 'bottom'
              });
              toast.present();
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
              this.nro_formulario = null;
              this.nro_acta = null;
              this.nro_decomiso = null;
              this.observaciones = null;
              this.propietario = null;
            }, error => {
              loader.dismiss();
              let toast = this.toastCtrl.create({
                message: 'Algo Salio Mal',
                duration: 6000,
                position: 'bottom'
              });
              toast.present();
            })
          }
        }
      ]
    });
    alert.present();
  }


  ngAfterViewInit() {
    this.canvasElement = this.canvas.nativeElement;
    this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + '');
    this.renderer.setElementAttribute(this.canvasElement, 'height', '200');

  }
  startDrawing(ev) {
    var canvasPosition = this.canvasElement.getBoundingClientRect();
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

  deleteFormulario(imagen) {
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

  takeFormulario() {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 960,
      targetHeight: 640,
      correctOrientation: true
    }
    this.camera.getPicture(options).then((imagedata) => {
      this.imgFormulario = {
        'url': 'data:image/jpeg;base64,' + imagedata,
        'estado': true
      }
    })
  }
  takeActividad() {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 960,
      targetHeight: 640,
      correctOrientation: true
    }
    this.camera.getPicture(options).then((imagedata) => {
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
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 960,
      targetHeight: 640,
      correctOrientation: true
    }
    this.camera.getPicture(options).then((imagedata) => {
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
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 960,
      targetHeight: 640,
      correctOrientation: true
    }
    this.camera.getPicture(options).then((imagedata) => {
      this.imgDecomiso2 = {
        'url': 'data:image/jpeg;base64,' + imagedata,
        'estado': true
      }
    })
  }
  getPosition() {
    let geoOptions: GeolocationOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 5000,
    };
    let watch = this.geo.watchPosition(geoOptions);
    watch.subscribe((data) => {
      this.lat = data.coords.latitude;
      this.lng = data.coords.longitude;
      this.validate = true;
    });
  }
  limpiarFirma(){    
    let ctx = this.canvasElement.getContext('2d');
    ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
  }

  saveCanvasImage(){
    
  }
}
