import Quartz
import Vision
from CoreFoundation import CFURLCreateWithFileSystemPath, kCFURLPOSIXPathStyle
import sys
import fitz

def recognize_text(image_path):
    url = CFURLCreateWithFileSystemPath(None, image_path, kCFURLPOSIXPathStyle, False)
    reqHandler = Vision.VNImageRequestHandler.alloc().initWithURL_options_(url, None)
    
    req = Vision.VNRecognizeTextRequest.alloc().init()
    # Ensure it's fast or accurate
    req.setRecognitionLevel_(Vision.VNRequestTextRecognitionLevelAccurate)
    
    success, error = reqHandler.performRequests_error_([req], None)
    if not success:
        print("Failed:", error)
        return

    for result in req.results():
        text = result.topCandidates_(1)[0].string()
        if any(w in text.lower() for w in ['solid', 'wire', 'strand']):
            bbox = result.boundingBox()
            print(f"Found '{text}': x={bbox.origin.x}, y={bbox.origin.y}, w={bbox.size.width}, h={bbox.size.height}")

doc = fitz.open('/Users/karolbohdanowicz/Downloads/Rozdzielacze PRESCOT.pdf')
page = doc[0]
pix = page.get_pixmap(dpi=150)
pix.save("page0.png")
recognize_text("page0.png")
