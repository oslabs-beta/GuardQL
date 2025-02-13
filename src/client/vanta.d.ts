declare module 'vanta/dist/vanta.net.min' {
    interface VantaNetOptions {
        el: HTMLElement | null;
        THREE: any;
        mouseControls?: boolean;
        touchControls?: boolean;
        gyroControls?: boolean;
        minHeight?: number;
        minWidth?: number;
        scale?: number;
        scaleMobile?: number;
        color?: number | string;
        lineColor?: string; 
        backgroundColor?: number | string;
        points?: number;
        maxDistance?: number;
        spacing?: number;
        showDots?: boolean;
        vertexColors?: boolean | number;
        connectionColor?: number | string;
        lineWidth?: number;
        persistence?: number;
      }
  
      function NET(options: VantaNetOptions): any; // <-- Allows accessing all properties

  
    export default NET;
  }