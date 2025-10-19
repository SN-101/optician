// // TryOnModal.tsx
// import React, { useRef, useState, useEffect } from "react";
// import { X, Camera as CameraIcon, Download, Share2, AlertCircle } from "lucide-react";
// import { useLanguage } from "../contexts/LanguageContext";
// import { Product } from "../data/products";

// // @ts-ignore
// import { FaceMesh } from "@mediapipe/face_mesh";
// // @ts-ignore
// import { Camera as MPCamera } from "@mediapipe/camera_utils";

// interface TryOnModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   product: Product | null;
// }

// export const TryOnModal: React.FC<TryOnModalProps> = ({ isOpen, onClose, product }) => {
//   const { language, t, isRTL } = useLanguage();

//   const videoRef = useRef<HTMLVideoElement>(null);
//   const overlayRef = useRef<HTMLCanvasElement>(null);
//   // const captureRef = useRef<HTMLCanvasElement>(null);

//   const [stream, setStream] = useState<MediaStream | null>(null);
//   const [capturedImage, setCapturedImage] = useState<string | null>(null);
//   const [error, setError] = useState<string>("");
//   const [glassesLoaded, setGlassesLoaded] = useState<boolean>(false);

//   const faceMeshRef = useRef<any>(null);
//   const mpCameraRef = useRef<any>(null);
//   const glassesImgRef = useRef<HTMLImageElement | null>(null);

//   // تحميل صورة النظارة
//   useEffect(() => {
//     setGlassesLoaded(false);
//     if (product?.glasses) {
//       const img = new Image();
//       img.crossOrigin = "anonymous";
//       img.onload = () => {
//         glassesImgRef.current = img;
//         setGlassesLoaded(true);
//       };
//       img.onerror = () => {
//         console.error("Failed to load glasses image:", product.glasses);
//         setError(isRTL ? "فشل تحميل صورة النظارة" : "Failed to load glasses image");
//         glassesImgRef.current = null;
//       };
//       img.src = product.glasses;
//     } else {
//       glassesImgRef.current = null;
//       setGlassesLoaded(true);
//     }
//   }, [product, isRTL]);

//   // تنظيف كامل عند إغلاق المودال أو إزالة المكون
//   useEffect(() => {
//     return () => {
//       stopCamera();
//     };
//   }, []);

//   // تأكد من إيقاف الكاميرا عند إغلاق المودال
//   useEffect(() => {
//     if (!isOpen) {
//       stopCamera();
//       setCapturedImage(null);
//     } else if (isOpen && product) {
//       // لا نبدأ الكاميرا تلقائيًا، بل عند الضغط على الزر
//     }
//   }, [isOpen, product]);

//   const startCamera = async () => {
//     if (!videoRef.current) {
//       setError(isRTL ? "عنصر الفيديو غير جاهز" : "Video element not ready");
//       return;
//     }

//     if (!navigator.mediaDevices?.getUserMedia) {
//       setError(isRTL ? "المتصفح لا يدعم الوصول للكاميرا" : "Browser does not support camera access");
//       return;
//     }

//     try {
//       setError("");
//       const mediaStream = await navigator.mediaDevices.getUserMedia({
//         video: { facingMode: "user", width: 640, height: 480 }
//       });
//       setStream(mediaStream);
//       videoRef.current.srcObject = mediaStream;

//       await new Promise<void>((resolve) => {
//         const v = videoRef.current!;
//         if (v.readyState >= 2) {
//           resolve();
//         } else {
//           const onLoaded = () => {
//             v.removeEventListener("loadedmetadata", onLoaded);
//             resolve();
//           };
//           v.addEventListener("loadedmetadata", onLoaded);
//         }
//       });

//       const video = videoRef.current;
//       const overlay = overlayRef.current!;
//       overlay.width = video.videoWidth;
//       overlay.height = video.videoHeight;

//       const faceMesh = new FaceMesh({
//         locateFile: (file: string) =>
//           `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
//       });

//       faceMesh.setOptions({
//         maxNumFaces: 3,
//         refineLandmarks: true,
//         minDetectionConfidence: 0.6,
//         minTrackingConfidence: 0.5
//       });

//       faceMesh.onResults((results: any) => {
//         const landmarks = results.multiFaceLandmarks ?? [];
//         drawOverlay(landmarks);
//       });

//       const mpCam = new MPCamera(video, {
//         onFrame: async () => {
//           try {
//             await faceMesh.send({ image: video });
//           } catch (err) {
//             // silent
//           }
//         },
//         width: video.videoWidth,
//         height: video.videoHeight
//       });

//       mpCam.start();
//       faceMeshRef.current = faceMesh;
//       mpCameraRef.current = mpCam;
//     } catch (err: any) {
//       console.error("Camera error:", err);
//       const msg = err.name === "NotAllowedError"
//         ? (isRTL ? "يرجى السماح بالوصول إلى الكاميرا" : "Please allow camera access")
//         : (isRTL ? "فشل في تشغيل الكاميرا" : "Failed to start camera");
//       setError(msg);
//     }
//   };

//   const stopCamera = () => {
//     if (mpCameraRef.current) {
//       try { mpCameraRef.current.stop(); } catch {}
//       mpCameraRef.current = null;
//     }
//     if (faceMeshRef.current) {
//       try { faceMeshRef.current.close(); } catch {}
//       faceMeshRef.current = null;
//     }
//     if (stream) {
//       stream.getTracks().forEach(track => track.stop());
//       setStream(null);
//     }
//     if (videoRef.current) {
//       videoRef.current.srcObject = null;
//     }
//     if (overlayRef.current) {
//       const ctx = overlayRef.current.getContext("2d");
//       ctx?.clearRect(0, 0, overlayRef.current.width, overlayRef.current.height);
//     }
//   };

// const drawOverlay = (landmarksList: any[] | null) => {
//   const canvas = overlayRef.current;
//   const video = videoRef.current;
//   const img = glassesImgRef.current;

//   if (!canvas || !video || !img || !glassesLoaded || !landmarksList?.length) return;

//   const ctx = canvas.getContext("2d");
//   if (!ctx) return;

//   if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//   }

//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   // ✅ رسم النظارة على كل وجه
//   for (const landmarks of landmarksList) {
//     if (!landmarks) continue;

//     const leftEyeCenter = landmarks[159];
//     const rightEyeCenter = landmarks[386];
//     const leftEyebrowTip = landmarks[55];
//     const rightEyebrowTip = landmarks[285];

//     if (!leftEyeCenter || !rightEyeCenter || !leftEyebrowTip || !rightEyebrowTip) continue;

//     const lex = leftEyeCenter.x * canvas.width;
//     const ley = leftEyeCenter.y * canvas.height;
//     const rex = rightEyeCenter.x * canvas.width;
//     const rey = rightEyeCenter.y * canvas.height;
//     const lby = leftEyebrowTip.y * canvas.height;
//     const rby = rightEyebrowTip.y * canvas.height;

//     const mx = (lex + rex) / 2;
//     const my = (ley + rey) / 2;

//     const eyeDist = Math.hypot(rex - lex, rey - ley);
//     const angle = Math.atan2(rey - ley, rex - lex);

//     const leftEyeToBrow = lby - ley;
//     const rightEyeToBrow = rby - rey;
//     const avgEyeToBrow = (leftEyeToBrow + rightEyeToBrow) / 2;
//     const eyeToBrow = Math.max(avgEyeToBrow, 6);

//     const scaleMultiplier = product?.scaleMultiplier ?? 1.0;
//     const glassesWidth = eyeDist * scaleMultiplier;
//     const imgAspect = img.height > 0 && img.width > 0 ? img.height / img.width : 0.35;
//     let glassesHeight = glassesWidth * imgAspect;

//     const heightFromBrow = eyeToBrow * 0.7;
//     glassesHeight = Math.max(glassesHeight, heightFromBrow);

//     const yOffset = eyeToBrow * 1.5;

//     // ✅ نفس منطق الرسم — لكن لكل وجه
//     ctx.save();
//     ctx.translate(canvas.width, 0);
//     ctx.scale(-1, 1);
//     ctx.translate(mx, my + yOffset);
//     ctx.rotate(angle);
//     ctx.globalAlpha = 0.98;
//     ctx.drawImage(img, -glassesWidth / 2, -glassesHeight / 2, glassesWidth, glassesHeight);
//     ctx.globalAlpha = 1;
//     ctx.restore();
//   }
// };

//   const capturePhoto = () => {
//   if (!videoRef.current || !overlayRef.current || !product) return;

//   const video = videoRef.current;
//   const overlay = overlayRef.current;

//   // ✅ إنشاء canvas مؤقت في الذاكرة (ليس في DOM)
//   const canvas = document.createElement("canvas");
//   canvas.width = video.videoWidth;
//   canvas.height = video.videoHeight;
//   const ctx = canvas.getContext("2d");
//   if (!ctx) return;

//   // رسم الفيديو معكوس (مثل المرآة)
//   ctx.save();
//   ctx.translate(canvas.width, 0);
//   ctx.scale(-1, 1);
//   ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
//   ctx.restore();

//   // رسم الـ overlay
//   ctx.drawImage(overlay, 0, 0, canvas.width, canvas.height);

//   // إضافة اسم المنتج
//   const productName = language === "ar"
//     ? product.name
//     : language === "en"
//       ? product.nameEn
//       : product.nameFr;

//   ctx.fillStyle = "rgba(0,0,0,0.6)";
//   ctx.fillRect(0, canvas.height - 60, canvas.width, 60);
//   ctx.fillStyle = "white";
//   const fontSize = Math.max(16, Math.floor(canvas.width / 30));
//   ctx.font = `${fontSize}px Arial, sans-serif`;
//   ctx.textAlign = "center";
//   ctx.textBaseline = "middle";
//   ctx.fillText(productName, canvas.width / 2, canvas.height - 30);

//   const dataUrl = canvas.toDataURL("image/png");
//   setCapturedImage(dataUrl);
// };

//   const downloadImage = () => {
//     if (!capturedImage) return;
//     const a = document.createElement("a");
//     a.href = capturedImage;
//     a.download = `glasses-tryon-${Date.now()}.png`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//   };

//   const shareImage = async () => {
//     if (!capturedImage) return;
//     try {
//       if (navigator.canShare && navigator.canShare({ files: [] })) {
//         const blob = await (await fetch(capturedImage)).blob();
//         const file = new File([blob], "tryon.png", { type: "image/png" });
//         await navigator.share({
//           files: [file],
//           title: t.tryOn?.title || "Try-On",
//           text: isRTL ? "شاهد تجربتي للنظارات!" : "Check out my glasses try-on!"
//         });
//       } else {
//         // fallback: copy URL
//         await navigator.clipboard.writeText(window.location.href);
//         alert(isRTL ? "تم نسخ الرابط إلى الحافظة" : "Link copied to clipboard");
//       }
//     } catch (err) {
//       console.error("Share failed:", err);
//       alert(isRTL ? "فشل في المشاركة" : "Sharing failed");
//     }
//   };

//   const getProductName = (p: Product) =>
//     language === "ar" ? p.name : language === "en" ? (p as any).nameEn : (p as any).nameFr;

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
//           <h2 className="text-2xl font-bold text-gray-800">{t.tryOn?.title}</h2>
//           <button
//             onClick={() => {
//               stopCamera();
//               setCapturedImage(null);
//               onClose();
//             }}
//             className="text-gray-500 hover:text-gray-700"
//             aria-label={isRTL ? "إغلاق" : "Close"}
//           >
//             <X className="h-6 w-6" />
//           </button>
//         </div>

//         <div className="p-6">
//           {product ? (
//             <div className="mb-6 p-4 bg-amber-50 rounded-lg flex items-center">
//               <img
//                 src={product.glasses}
//                 alt={getProductName(product)}
//                 className="w-20 h-20 object-contain rounded-lg bg-white"
//                 onError={(e) => (e.currentTarget.style.display = "none")}
//               />
//               <div className={`${isRTL ? "mr-4" : "ml-4"}`}>
//                 <h3 className="font-semibold text-lg text-gray-800">{getProductName(product)}</h3>
//                 <p className="text-amber-600 font-bold">{product.price} {t.products?.mad}</p>
//               </div>
//             </div>
//           ) : (
//             <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
//               <p className="text-blue-700 text-center">{t.tryOn?.selectProduct}</p>
//             </div>
//           )}

//           {error && (
//             <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
//               <AlertCircle className={`h-5 w-5 text-red-500 ${isRTL ? "ml-3" : "mr-3"}`} />
//               <p className="text-red-700">{error}</p>
//             </div>
//           )}

//           <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-4">
//             {capturedImage ? (
//               <img src={capturedImage} alt="Captured try-on" className="w-full h-auto" />
//             ) : (
//               <>
//                 <video
//                   ref={videoRef}
//                   autoPlay
//                   playsInline
//                   muted
//                   className="w-full h-auto transform scale-x-[-1]"
//                 />
//                 <canvas
//                   ref={overlayRef}
//                   className="absolute inset-0 w-full h-full pointer-events-none"
//                 />
//               </>
//             )}
//           </div>

//           <div className="flex flex-wrap gap-3 justify-center">
//             {!capturedImage ? (
//               !stream ? (
//                 <button
//                   onClick={startCamera}
//                   className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center"
//                 >
//                   <CameraIcon className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"}`} />
//                   {t.tryOn?.startCamera}
//                 </button>
//               ) : (
//                 <>
//                   <button
//                     onClick={capturePhoto}
//                     disabled={!product || !glassesLoaded}
//                     className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50 flex items-center"
//                   >
//                     <CameraIcon className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"}`} />
//                     {t.tryOn?.capture}
//                   </button>
//                   <button
//                     onClick={stopCamera}
//                     className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold"
//                   >
//                     {t.tryOn?.stopCamera}
//                   </button>
//                 </>
//               )
//             ) : (
//               <>
//                 <button
//                   onClick={downloadImage}
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center"
//                 >
//                   <Download className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"}`} />
//                   {t.tryOn?.download}
//                 </button>
//                 <button
//                   onClick={shareImage}
//                   className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center"
//                 >
//                   <Share2 className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"}`} />
//                   {t.tryOn?.share}
//                 </button>
//                 <button
//                   onClick={() => setCapturedImage(null)}
//                   className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold"
//                 >
//                   {isRTL ? "التقاط صورة جديدة" : "Take New Photo"}
//                 </button>
//               </>
//             )}
//           </div>

//           <div className="mt-6 p-4 bg-gray-50 rounded-lg">
//             <h3 className="font-semibold text-gray-800 mb-2">
//               {isRTL ? "نصائح للحصول على أفضل تجربة:" : "Tips for best experience:"}
//             </h3>
//             <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
//               <li>{isRTL ? "تأكد من إضاءة جيدة" : "Ensure good lighting"}</li>
//               <li>{isRTL ? "انظر مباشرة للكاميرا" : "Look directly at the camera"}</li>
//               <li>{isRTL ? "ابتعد قليلاً عن الكاميرا" : "Position yourself at arm's length"}</li>
//               <li>{isRTL ? "جرب نظارات مختلفة قبل اتخاذ القرار" : "Try different glasses before deciding"}</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


// TryOnModal.tsx
import React, { useRef, useState, useEffect } from "react";
import { X, Camera as CameraIcon, Download, Share2, AlertCircle } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { Product } from "../data/products";

// ✅ لا استيرادات من @mediapipe هنا
// نستخدم النسخة من CDN عبر window

// تعريف الأنواع العالمية لتجنب أخطاء TypeScript
declare global {
  interface Window {
    FaceMesh: any;
    Camera: any;
  }
}

interface TryOnModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export const TryOnModal: React.FC<TryOnModalProps> = ({ isOpen, onClose, product }) => {
  const { language, t, isRTL } = useLanguage();

  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const [glassesLoaded, setGlassesLoaded] = useState<boolean>(false);

  const faceMeshRef = useRef<any>(null);
  const mpCameraRef = useRef<any>(null);
  const glassesImgRef = useRef<HTMLImageElement | null>(null);

  // تحميل صورة النظارة
  useEffect(() => {
    setGlassesLoaded(false);
    if (product?.glasses) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        glassesImgRef.current = img;
        setGlassesLoaded(true);
      };
      img.onerror = () => {
        console.error("Failed to load glasses image:", product.glasses);
        setError(isRTL ? "فشل تحميل صورة النظارة" : "Failed to load glasses image");
        glassesImgRef.current = null;
      };
      img.src = product.glasses;
    } else {
      glassesImgRef.current = null;
      setGlassesLoaded(true);
    }
  }, [product, isRTL]);

  // تنظيف كامل
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      setCapturedImage(null);
    }
  }, [isOpen]);

  const startCamera = async () => {
    if (!videoRef.current) {
      setError(isRTL ? "عنصر الفيديو غير جاهز" : "Video element not ready");
      return;
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      setError(isRTL ? "المتصفح لا يدعم الوصول للكاميرا" : "Browser does not support camera access");
      return;
    }

    try {
      setError("");
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 640, height: 480 }
      });
      setStream(mediaStream);
      videoRef.current.srcObject = mediaStream;

      await new Promise<void>((resolve) => {
        const v = videoRef.current!;
        if (v.readyState >= 2) {
          resolve();
        } else {
          const onLoaded = () => {
            v.removeEventListener("loadedmetadata", onLoaded);
            resolve();
          };
          v.addEventListener("loadedmetadata", onLoaded);
        }
      });

      const video = videoRef.current;
      const overlay = overlayRef.current!;
      overlay.width = video.videoWidth;
      overlay.height = video.videoHeight;

      // ✅ استخدام MediaPipe من window (من CDN)
      const FaceMesh = window.FaceMesh;
      const Camera = window.Camera;

      const faceMesh = new FaceMesh({
        locateFile: (file: string) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
      });

      faceMesh.setOptions({
        maxNumFaces: 3,
        refineLandmarks: true,
        minDetectionConfidence: 0.6,
        minTrackingConfidence: 0.5
      });

      faceMesh.onResults((results: any) => {
        const landmarksList = results.multiFaceLandmarks ?? [];
        drawOverlay(landmarksList);
      });

      const mpCam = new Camera(video, {
        onFrame: async () => {
          try {
            await faceMesh.send({ image: video });
          } catch (err) {
            // silent
          }
        },
        width: video.videoWidth,
        height: video.videoHeight
      });

      mpCam.start();
      faceMeshRef.current = faceMesh;
      mpCameraRef.current = mpCam;
    } catch (err: any) {
      console.error("Camera error:", err);
      const msg = err.name === "NotAllowedError"
        ? (isRTL ? "يرجى السماح بالوصول إلى الكاميرا" : "Please allow camera access")
        : (isRTL ? "فشل في تشغيل الكاميرا" : "Failed to start camera");
      setError(msg);
    }
  };

  const stopCamera = () => {
    if (mpCameraRef.current) {
      try { mpCameraRef.current.stop(); } catch {}
      mpCameraRef.current = null;
    }
    if (faceMeshRef.current) {
      try { faceMeshRef.current.close(); } catch {}
      faceMeshRef.current = null;
    }
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    if (overlayRef.current) {
      const ctx = overlayRef.current.getContext("2d");
      ctx?.clearRect(0, 0, overlayRef.current.width, overlayRef.current.height);
    }
  };

  const drawOverlay = (landmarksList: any[] | null) => {
    const canvas = overlayRef.current;
    const video = videoRef.current;
    const img = glassesImgRef.current;

    if (!canvas || !video || !img || !glassesLoaded || !landmarksList?.length) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const landmarks of landmarksList) {
      if (!landmarks) continue;

      const leftEyeCenter = landmarks[159];
      const rightEyeCenter = landmarks[386];
      const leftEyebrowTip = landmarks[55];
      const rightEyebrowTip = landmarks[285];

      if (!leftEyeCenter || !rightEyeCenter || !leftEyebrowTip || !rightEyebrowTip) continue;

      const lex = leftEyeCenter.x * canvas.width;
      const ley = leftEyeCenter.y * canvas.height;
      const rex = rightEyeCenter.x * canvas.width;
      const rey = rightEyeCenter.y * canvas.height;
      const lby = leftEyebrowTip.y * canvas.height;
      const rby = rightEyebrowTip.y * canvas.height;

      const mx = (lex + rex) / 2;
      const my = (ley + rey) / 2;

      const eyeDist = Math.hypot(rex - lex, rey - ley);
      const angle = Math.atan2(rey - ley, rex - lex);

      const leftEyeToBrow = lby - ley;
      const rightEyeToBrow = rby - rey;
      const avgEyeToBrow = (leftEyeToBrow + rightEyeToBrow) / 2;
      const eyeToBrow = Math.max(avgEyeToBrow, 6);

      const scaleMultiplier = product?.scaleMultiplier ?? 1.0;
      const glassesWidth = eyeDist * scaleMultiplier;
      const imgAspect = img.height > 0 && img.width > 0 ? img.height / img.width : 0.35;
      let glassesHeight = glassesWidth * imgAspect;

      const heightFromBrow = eyeToBrow * 0.7;
      glassesHeight = Math.max(glassesHeight, heightFromBrow);

      const yOffset = eyeToBrow * 1.5;

      ctx.save();
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.translate(mx, my + yOffset);
      ctx.rotate(angle);
      ctx.globalAlpha = 0.98;
      ctx.drawImage(img, -glassesWidth / 2, -glassesHeight / 2, glassesWidth, glassesHeight);
      ctx.globalAlpha = 1;
      ctx.restore();
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !overlayRef.current || !product) return;

    const video = videoRef.current;
    const overlay = overlayRef.current;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.save();
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.restore();

    ctx.drawImage(overlay, 0, 0, canvas.width, canvas.height);

    const productName = language === "ar"
      ? product.name
      : language === "en"
        ? product.nameEn
        : product.nameFr;

    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(0, canvas.height - 60, canvas.width, 60);
    ctx.fillStyle = "white";
    const fontSize = Math.max(16, Math.floor(canvas.width / 30));
    ctx.font = `${fontSize}px Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(productName, canvas.width / 2, canvas.height - 30);

    const dataUrl = canvas.toDataURL("image/png");
    setCapturedImage(dataUrl);
  };

  const downloadImage = () => {
    if (!capturedImage) return;
    const a = document.createElement("a");
    a.href = capturedImage;
    a.download = `glasses-tryon-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const shareImage = async () => {
    if (!capturedImage) return;
    try {
      if (navigator.canShare && navigator.canShare({ files: [] })) {
        const blob = await (await fetch(capturedImage)).blob();
        const file = new File([blob], "tryon.png", { type: "image/png" });
        await navigator.share({
          files: [file],
          title: t.tryOn?.title || "Try-On",
          text: isRTL ? "شاهد تجربتي للنظارات!" : "Check out my glasses try-on!"
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert(isRTL ? "تم نسخ الرابط إلى الحافظة" : "Link copied to clipboard");
      }
    } catch (err) {
      console.error("Share failed:", err);
      alert(isRTL ? "فشل في المشاركة" : "Sharing failed");
    }
  };

  const getProductName = (p: Product) =>
    language === "ar" ? p.name : language === "en" ? p.nameEn : p.nameFr;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-gray-800">{t.tryOn?.title}</h2>
          <button
            onClick={() => {
              stopCamera();
              setCapturedImage(null);
              onClose();
            }}
            className="text-gray-500 hover:text-gray-700"
            aria-label={isRTL ? "إغلاق" : "Close"}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {product ? (
            <div className="mb-6 p-4 bg-amber-50 rounded-lg flex items-center">
              <img
                src={product.glasses}
                alt={getProductName(product)}
                className="w-20 h-20 object-contain rounded-lg bg-white"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              <div className={`${isRTL ? "mr-4" : "ml-4"}`}>
                <h3 className="font-semibold text-lg text-gray-800">{getProductName(product)}</h3>
                <p className="text-amber-600 font-bold">{product.price} {t.products?.mad}</p>
              </div>
            </div>
          ) : (
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-700 text-center">{t.tryOn?.selectProduct}</p>
            </div>
          )}

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <AlertCircle className={`h-5 w-5 text-red-500 ${isRTL ? "ml-3" : "mr-3"}`} />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-4">
            {capturedImage ? (
              <img src={capturedImage} alt="Captured try-on" className="w-full h-auto" />
            ) : (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-auto transform scale-x-[-1]"
                />
                <canvas
                  ref={overlayRef}
                  className="absolute inset-0 w-full h-full pointer-events-none"
                />
              </>
            )}
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {!capturedImage ? (
              !stream ? (
                <button
                  onClick={startCamera}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center"
                >
                  <CameraIcon className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"}`} />
                  {t.tryOn?.startCamera}
                </button>
              ) : (
                <>
                  <button
                    onClick={capturePhoto}
                    disabled={!product || !glassesLoaded}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50 flex items-center"
                  >
                    <CameraIcon className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"}`} />
                    {t.tryOn?.capture}
                  </button>
                  <button
                    onClick={stopCamera}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold"
                  >
                    {t.tryOn?.stopCamera}
                  </button>
                </>
              )
            ) : (
              <>
                <button
                  onClick={downloadImage}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center"
                >
                  <Download className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"}`} />
                  {t.tryOn?.download}
                </button>
                <button
                  onClick={shareImage}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center"
                >
                  <Share2 className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"}`} />
                  {t.tryOn?.share}
                </button>
                <button
                  onClick={() => setCapturedImage(null)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold"
                >
                  {isRTL ? "التقاط صورة جديدة" : "Take New Photo"}
                </button>
              </>
            )}
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">
              {isRTL ? "نصائح للحصول على أفضل تجربة:" : "Tips for best experience:"}
            </h3>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>{isRTL ? "تأكد من إضاءة جيدة" : "Ensure good lighting"}</li>
              <li>{isRTL ? "انظر مباشرة للكاميرا" : "Look directly at the camera"}</li>
              <li>{isRTL ? "ابتعد قليلاً عن الكاميرا" : "Position yourself at arm's length"}</li>
              <li>{isRTL ? "جرب نظارات مختلفة قبل اتخاذ القرار" : "Try different glasses before deciding"}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
