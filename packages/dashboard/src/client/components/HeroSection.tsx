// import { FC, useEffect, useRef, useState } from 'react'
// import NET from 'vanta/dist/vanta.net.min'
// import * as THREE from 'three'

// interface HeroProps {
//     logo: string;
//     handleNavClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
// }

// const Hero: FC<HeroProps> = ({ logo, handleNavClick }) => {
//   const [vantaEffect, setVantaEffect] = useState<any>(null)
//   const myRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       (window as any).THREE = THREE;
//     }
    
//     if (!vantaEffect && myRef.current) {
//         const effect = NET({
//           el: myRef.current,
//           THREE,
//           mouseControls: true,
//           touchControls: true,
//           gyroControls: false,
//           minHeight: 200.0,
//           minWidth: 200.0,
//           spacing: 15.0,
//           maxDistance: 19.0,
//           points: 10.0,
//           scale: 1.0,
//           scaleMobile: 1.0,
//           color: 0xff00c3,
//           backgroundColor: 0x641956,
//           vertexColors: 1,
//         });
//         console.log("Effect instance:", effect);
//         setVantaEffect(effect);
//         console.log("Current vanta effect:", vantaEffect);
//         setTimeout(() => {
//             if (effect?.scene) {
//               console.log("Scene Children:", effect.scene.children);
//             } else {
//               console.log("Effect has no scene.");
//             }
//           }, 1000);

          
//     }; 
//     return () => {
//       if (vantaEffect) vantaEffect.destroy()
//     };
//   }, [vantaEffect]);

//   return (
//     <section className="hero" ref={myRef}>
//       <div className="hero-content">
//         <img src={logo} alt="GuardQL Logo" className="drawer-logo" style={{height: 280}}/>
//         <br />
//         <h2>Monitor, Debug, and Optimize Your GraphQL APIs With Ease</h2>
//         <br />
//         <p>GuardQL helps developers track errors and performance metrics effortlessly</p>
//         <br />
//         <br />
//         <button className="get-started-btn">
//           <a className="get-started-btn-a" href="#" onClick={handleNavClick}>Get Started</a>
//         </button>
//       </div>
//     </section>
//   );
// };

// export default Hero;