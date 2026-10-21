"""Generate og-image.png (1200x630), twitter-card.png (1200x600) and icon-512.png. Requires Pillow + Inter font."""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
INK=(14,19,48); VIOLET=(109,74,255); CORAL=(255,107,74); PAPER=(248,247,252); MUTED=(170,176,212); MINT=(31,191,143)
F="/usr/share/fonts/opentype/inter/"
def font(w,s):
    for n in (f"Inter-{w}.otf",): 
        try: return ImageFont.truetype(F+n,s)
        except Exception: pass
    return ImageFont.load_default()

def gradient(size,c1,c2):
    w,h=size; g=Image.new("RGB",size)
    px=g.load()
    for y in range(h):
        for x in range(w):
            t=(x/w*0.6+y/h*0.4)
            px[x,y]=tuple(int(c1[i]+(c2[i]-c1[i])*t) for i in range(3))
    return g

def rr(d,box,r,fill=None,outline=None,width=1): d.rounded_rectangle(box,r,fill=fill,outline=outline,width=width)

def slide_card(img,x,y,w,h,title_w,accent,tilt=0):
    card=Image.new("RGBA",(w,h),(0,0,0,0)); d=ImageDraw.Draw(card)
    rr(d,(0,0,w-1,h-1),int(h*.07),fill=PAPER)
    rr(d,(int(w*.08),int(h*.12),int(w*.08+w*title_w),int(h*.12+h*.09)),8,fill=INK)
    for i,lw in enumerate((.7,.55,.62)):
        yy=int(h*.34+i*h*.14)
        d.ellipse((int(w*.08),yy+3,int(w*.08)+12,yy+15),fill=accent)
        rr(d,(int(w*.08)+26,yy,int(w*.08+26+w*lw*.7),yy+16),8,fill=(190,186,225))
    rr(d,(int(w*.62),int(h*.55),int(w*.92),int(h*.88)),int(h*.06),fill=accent)
    if tilt: card=card.rotate(tilt,expand=True,resample=Image.BICUBIC)
    sh=Image.new("RGBA",card.size,(0,0,0,0)); sh.paste((0,0,0,110),mask=card.split()[3]); sh=sh.filter(ImageFilter.GaussianBlur(18))
    img.paste(sh,(x+10,y+22),sh); img.paste(card,(x,y),card)

def render(W,H,path):
    img=gradient((W,H),INK,(38,26,110)).convert("RGBA")
    glow=Image.new("RGBA",(W,H),(0,0,0,0)); g=ImageDraw.Draw(glow)
    g.ellipse((W*.55,-H*.3,W*1.2,H*.7),fill=(109,74,255,90)); g.ellipse((W*.7,H*.5,W*1.3,H*1.3),fill=(255,107,74,70))
    img.alpha_composite(glow.filter(ImageFilter.GaussianBlur(90)))
    d=ImageDraw.Draw(img)
    # brand
    rr(d,(64,56,112,104),12,fill=VIOLET); d.polygon([(80,68),(80,92),(100,80)],fill=(255,255,255))
    d.text((128,60),"PowerPoint",font=font("ExtraBold",36),fill=(255,255,255)); 
    bw=d.textlength("PowerPoint",font=font("ExtraBold",36)); d.text((128+bw,60),"2Vid",font=font("ExtraBold",36),fill=(143,117,255))
    # headline
    hf=font("ExtraBold",76); y=H*.30
    for line,col in (("PowerPoint",(255,255,255)),("to Video",(255,255,255)),("Converter",CORAL)):
        d.text((64,y),line,font=hf,fill=col); y+=84
    d.text((64,y+14),"Narrated, animated explainer videos",font=font("Medium",30),fill=MUTED)
    d.text((64,y+54),"from PPTX & Google Slides. Private and online.",font=font("Medium",30),fill=MUTED)
    # visual: slide -> video
    cw,ch=int(W*.30),int(H*.38)
    slide_card(img,int(W*.56),int(H*.12),cw,ch,.5,VIOLET,tilt=4)
    slide_card(img,int(W*.64),int(H*.36),int(W*.30),int(H*.42),.6,CORAL,tilt=-3)
    # play badge
    d=ImageDraw.Draw(img); cx,cy=int(W*.64),int(H*.70); r=int(H*.095)
    d.ellipse((cx-r,cy-r,cx+r,cy+r),fill=(255,255,255)); d.polygon([(cx-r*.28,cy-r*.42),(cx-r*.28,cy+r*.42),(cx+r*.5,cy)],fill=VIOLET)
    d.text((W-64,H-52),"powerpoint2vid.com",font=font("SemiBold",26),fill=(255,255,255),anchor="rs")
    img.convert("RGB").save(path,optimize=True)

render(1200,630,"assets/og-image.png"); render(1200,600,"assets/twitter-card.png")
ic=Image.new("RGB",(512,512)); ic=gradient((512,512),VIOLET,CORAL); m=Image.new("L",(512,512),0); ImageDraw.Draw(m).rounded_rectangle((0,0,511,511),128,fill=255)
o=Image.new("RGBA",(512,512),(0,0,0,0)); o.paste(ic,mask=m); d=ImageDraw.Draw(o)
d.rounded_rectangle((96,128,416,352),40,fill=(255,255,255)); d.polygon([(224,192),(224,288),(320,240)],fill=(91,61,240)); d.rounded_rectangle((160,392,352,424),16,fill=(255,255,255,220))
o.save("assets/icon-512.png")
