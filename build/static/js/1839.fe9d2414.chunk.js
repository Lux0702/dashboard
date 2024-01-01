"use strict";(self.webpackChunk_coreui_coreui_free_react_admin_template=self.webpackChunk_coreui_coreui_free_react_admin_template||[]).push([[1839],{55437:(e,s,a)=>{a.r(s),a.d(s,{default:()=>d});var t=a(72791),l=a(78983),n=a(75808),o=a(9085),r=(a(5462),a(23458)),c=a(14701),i=a(80184);const d=()=>{const[e,s]=(0,t.useState)([]),[a,d]=(0,t.useState)([]),[h,u]=(0,t.useState)(!1),[g,p]=(0,t.useState)(!1),[x,m]=(0,t.useState)(null),[b,j]=(0,t.useState)(!1),[y,f]=(0,t.useState)(null),[N,k]=(0,t.useState)(!1),[C,v]=(0,t.useState)([]),[D,S]=(0,t.useState)([]),[w,A]=(0,t.useState)([]),[I,T]=(0,t.useState)(null),[O,E]=(0,t.useState)(null),[L,_]=(0,t.useState)(!1),[B,F]=(0,t.useState)(null),[P,R]=(0,t.useState)(!1),[M,z]=(0,t.useState)({title:"",categories:[],stock:0,authors:[],price:0,isbn:"",pageNumbers:"",publishedDate:"",publisher:"",language:"",description:"",image:null});(0,t.useEffect)((()=>{y&&z({title:y.title||"",categories:y.categories||[],stock:y.stock||0,authors:y.authors||[],price:y.price||0,isbn:y.isbn||"",pageNumbers:y.pageNumbers||"",publishedDate:y.publishedDate||"",publisher:y.publisher||"",language:y.language||"",description:y.description||"",image:y.image||null})}),[y]);const J=()=>{S(null),T(null),F(null)};(0,t.useEffect)((()=>{N||(J(),_(!1),m(null))}),[N]);const H=async()=>{try{R(!0);const e=await fetch("".concat(r.C,"/books"));if(e.ok){const a=await e.json();s(a.data)}else console.error("Error fetching books:",e.statusText)}catch(e){console.error("Error fetching books:",e)}finally{R(!1)}};(0,t.useEffect)((()=>{H()}),[]),(0,t.useEffect)((()=>{(async()=>{try{R(!0);const e=await fetch("".concat(r.C,"/categories"));if(e.ok){const s=await e.json();console.log("categoryData:",s),s&&s.data&&Array.isArray(s.data)?v(s.data.map((e=>({value:e.categoryName,label:e.categoryName})))):console.error("D\u1eef li\u1ec7u t\u1eeb API kh\xf4ng \u0111\xfang \u0111\u1ecbnh d\u1ea1ng.")}else console.error("Kh\xf4ng th\u1ec3 l\u1ea5y d\u1eef li\u1ec7u t\u1eeb API.");const s=await fetch("".concat(r.C,"/authors"));if(s.ok){const e=await s.json();console.log("categoryData:",e),e&&e.data&&Array.isArray(e.data)?A(e.data.map((e=>({value:e.authorName,label:e.authorName})))):console.error("D\u1eef li\u1ec7u t\u1eeb API kh\xf4ng \u0111\xfang \u0111\u1ecbnh d\u1ea1ng.")}else console.error("Kh\xf4ng th\u1ec3 l\u1ea5y d\u1eef li\u1ec7u t\u1eeb API.")}catch(e){console.error("L\u1ed7i trong qu\xe1 tr\xecnh l\u1ea5y d\u1eef li\u1ec7u t\u1eeb API:",e)}finally{R(!1)}})()}),[]),(0,t.useEffect)((()=>{p(a.length===e.length)}),[a,e]);const U=async e=>{try{R(!0),console.log(e);const s=await fetch("".concat(r.C,"/books/").concat(e));if(s.ok){const e=await s.json();f(e.data),k(!0)}else console.error("Error fetching product details:",s.statusText)}catch(s){console.error("Error fetching product details:",s)}finally{R(!1)}};(0,t.useEffect)((()=>{y&&(S(y.categories.map((e=>({value:e.categoryName,label:e.categoryName})))||[]),T(y.authors.map((e=>({value:e.authorName,label:e.authorName})))||[]),k(!0))}),[y]),(0,t.useEffect)((()=>{x&&U(x)}),[x]);const X=e=>{const s=e.target.files[0];s&&E(s),z((e=>({...e,image:s})))},Z=(e,s)=>{z((a=>({...a,[e]:Array.isArray(a[e])?a[e]:s})))};return(0,i.jsxs)(l.rb,{children:[(0,i.jsx)(l.b7,{xs:12,children:(0,i.jsxs)(l.xH,{className:"mb-4",children:[(0,i.jsxs)(l.bn,{children:[(0,i.jsx)("strong",{children:"Danh s\xe1ch s\u1ea3n ph\u1ea9m"})," ",(0,i.jsx)("small",{})]}),(0,i.jsxs)(l.sl,{children:[(0,i.jsxs)(l.Sx,{children:[(0,i.jsx)(l.V,{children:(0,i.jsxs)(l.T6,{children:[(0,i.jsx)(l.is,{scope:"col",children:"#"}),(0,i.jsx)(l.is,{scope:"col",children:"T\u1ef1a \u0111\u1ec1"}),(0,i.jsx)(l.is,{scope:"col",children:"Th\u1ec3 lo\u1ea1i"}),(0,i.jsx)(l.is,{scope:"col",children:"T\xe1c gi\u1ea3"}),(0,i.jsx)(l.is,{scope:"col",children:"S\u1ed1 l\u01b0\u1ee3ng"}),(0,i.jsx)(l.is,{scope:"col",children:"Gi\xe1 ti\u1ec1n"})]})}),(0,i.jsx)(l.NR,{children:e.map(((e,s)=>(0,i.jsxs)(l.T6,{active:x===e._id,onClick:s=>{var a;a=e._id,m(a),console.log(a)},children:[(0,i.jsx)(l.is,{scope:"row",children:s+1}),(0,i.jsx)(l.NN,{children:e.title}),(0,i.jsx)(l.NN,{children:e.categories&&e.categories.length>0?e.categories[0].categoryName:""}),(0,i.jsx)(l.NN,{children:e.authors&&e.authors.length>0?e.authors[0].authorName:""}),(0,i.jsx)(l.NN,{children:e.stock}),(0,i.jsx)(l.NN,{children:e.price})]},s)))})]}),x&&(0,i.jsxs)(l.Tk,{visible:b,onClose:()=>j(!1),children:[(0,i.jsx)(l.p0,{closeButton:!0,children:(0,i.jsx)(l.fl,{children:"Ch\u1ecdn ch\u1ee9c n\u0103ng"})}),(0,i.jsx)(l.sD,{className:"edit-buton",children:(0,i.jsx)(l.u5,{onClick:()=>U(x),className:"edit-btn",color:"primary",children:"Chi ti\u1ebft"})})]}),(0,i.jsxs)(l.Tk,{alignment:"center",visible:h,onClose:()=>u(!1),"aria-labelledby":"DeleteConfirmationModal",children:[(0,i.jsx)(l.p0,{closeButton:!0,children:(0,i.jsx)(l.fl,{id:"DeleteConfirmationModal",children:"X\xe1c nh\u1eadn x\xf3a"})}),(0,i.jsx)(l.sD,{children:"B\u1ea1n c\xf3 ch\u1eafc mu\u1ed1n x\xf3a?"}),(0,i.jsxs)(l.Ym,{children:[(0,i.jsx)(l.u5,{color:"secondary",onClick:()=>{u(!1),k(!0),console.log("Selected Row ID in handleDelete:",x)},children:"H\u1ee7y"}),(0,i.jsx)(l.u5,{color:"danger",onClick:()=>{(async e=>{u(!1),console.log("Selected Row ID in confirmDelete:",e);const a=localStorage.getItem("userInfo"),t=JSON.parse(a).data.accessToken;try{R(!0);const a=await fetch("".concat(r.C,"/books/").concat(e),{method:"DELETE",headers:{Authorization:"Bearer ".concat(t)}});if(a.ok){console.log("Book with ID ".concat(e," deleted successfully")),s((s=>s.filter((s=>s._id!==e))));const t=await a.json();o.Am.success(t.message,{onClose:()=>{k(!1),F(null)}})}else{const s=await a.json();o.Am.error(s.message),console.error("Error deleting book with ID ".concat(e,":"),a.statusText)}}catch(l){o.Am.error("Error deleting book with ID ".concat(e,":"),l)}finally{R(!1)}})(x)},children:"X\xf3a"})]})]}),(0,i.jsxs)(l.Tk,{size:"lg",alignment:"center",visible:N,onClose:()=>{J(),k(!1)},children:[(0,i.jsxs)(l.p0,{closeButton:!0,children:[(0,i.jsx)(l.fl,{children:"Chi ti\u1ebft s\u1ea3n ph\u1ea9m"}),(0,i.jsxs)("div",{style:{marginLeft:"450px"},children:[(0,i.jsx)(l.u5,{color:"primary",onClick:()=>{_(!0)},children:"S\u1eeda"}),(0,i.jsx)(l.u5,{style:{marginLeft:"10px"},color:"danger",onClick:()=>{(async e=>{F(e),u(!0),console.log("Selected Row ID in handleDelete:",e),console.log("Selected Row ID in handleDelete -delete:",B)})(x)},children:"X\xf3a"})]})]}),(0,i.jsx)(l.sD,{children:y&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)("p",{children:["T\u1ef1a \u0111\u1ec1:",(0,i.jsx)(l.jO,{"aria-label":"T\u1ef1a \u0111\u1ec1",disabled:!L,value:M.title||"",onChange:e=>Z("title",e.target.value)})]}),(0,i.jsxs)("p",{children:[" ","Th\u1ec3 lo\u1ea1i:",(0,i.jsx)(n.ZP,{isDisabled:!L,isMulti:!0,isClearable:!0,onChange:e=>{S(e),z((s=>({...s,categories:Array.isArray(e)?e:[]})))},options:C,value:D||[]})]}),(0,i.jsxs)("p",{children:["T\xe1c gi\u1ea3:"," ",(0,i.jsx)(n.ZP,{isDisabled:!L,isMulti:!0,isClearable:!0,onChange:e=>{T(e),z((s=>({...s,authors:Array.isArray(e)?e:[]})))},options:w,value:I||[]})]}),(0,i.jsx)("div",{className:"mb-3",children:(0,i.jsxs)(l.rb,{children:[(0,i.jsxs)(l.b7,{xs:"6",className:"mb-3",children:[(0,i.jsx)(l.L8,{htmlFor:"stock",children:"S\u1ed1 L\u01b0\u1ee3ng:"}),(0,i.jsx)(l.jO,{disabled:!L,type:"number",id:"stock",name:"stock",placeholder:"Nh\u1eadp s\u1ed1 l\u01b0\u1ee3ng",value:M.stock||"",onChange:e=>Z("stock",e.target.value)})]}),(0,i.jsxs)(l.b7,{xs:"6",className:"mb-3",children:[(0,i.jsx)(l.L8,{htmlFor:"price",children:"Gi\xe1 ti\u1ec1n:"}),(0,i.jsx)(l.jO,{disabled:!L,type:"number",id:"price",name:"price",placeholder:"Ng\xf4n ng\u1eef s\xe1ch",value:M.price||0,onChange:e=>Z("price",e.target.value)})]})]})}),(0,i.jsx)("div",{className:"mb-3",children:(0,i.jsxs)(l.rb,{children:[(0,i.jsxs)(l.b7,{xs:"6",className:"mb-3",children:[(0,i.jsx)(l.L8,{htmlFor:"pageNumbers",children:"S\u1ed1 trang:"}),(0,i.jsx)(l.jO,{disabled:!L,type:"text",id:"pageNumbers",name:"pageNumbers",placeholder:"Nh\u1eadp s\u1ed1 trang",value:M.pageNumbers,onChange:e=>Z("pageNumbers",e.target.value)})]}),(0,i.jsxs)(l.b7,{xs:"6",className:"mb-3",children:[(0,i.jsx)(l.L8,{htmlFor:"publisher",children:"Nh\xe0 xu\u1ea5t b\u1ea3n:"}),(0,i.jsx)(l.jO,{disabled:!L,type:"text",id:"publisher",name:"publisher",placeholder:"Nh\u1eadp nh\xe0 xu\u1ea5t b\u1ea3n",value:M.publisher,onChange:e=>Z("publisher",e.target.value)})]})]})}),(0,i.jsx)("div",{className:"mb-3",children:(0,i.jsxs)(l.rb,{children:[(0,i.jsxs)(l.b7,{xs:"6",className:"mb-3",children:[(0,i.jsx)(l.L8,{htmlFor:"publishDate",children:"Ng\xe0y xu\u1ea5t b\u1ea3n:"}),(0,i.jsx)(l.jO,{disabled:!L,type:"date",id:"publishedDate",name:"publishedDate ",placeholder:"Nh\u1eadp ng\xe0y xu\u1ea5t b\u1ea3n",value:(q=M.publishedDate,new Date(q).toLocaleDateString("en-CA")),onChange:e=>Z("publishedDate",e.target.value)})]}),(0,i.jsxs)(l.b7,{xs:"6",className:"mb-3",children:[(0,i.jsx)(l.L8,{htmlFor:"language",children:"Ng\xf4n ng\u1eef:"}),(0,i.jsx)(l.jO,{disabled:!L,type:"text",id:"language",name:"language",placeholder:"Nh\u1eadp ng\xf4n ng\u1eef",value:M.language,onChange:e=>Z("language",e.target.value)})]})]})}),"M\xe3 \u0111\u1ecbnh danh ISBN:"," ",(0,i.jsx)(l.jO,{disabled:!L,type:"text",id:"isbn",name:"isbn",placeholder:"Nh\u1eadp m\xe3 isbn",value:M.isbn,onChange:e=>Z("isbn",e.target.value)}),(0,i.jsxs)("div",{children:["M\xf4 t\u1ea3:",(0,i.jsx)(l.PB,{disabled:!L,rows:5,type:"text",id:"description",name:"description",placeholder:"M\xf4 t\u1ea3 s\xe1ch",value:M.description,onChange:e=>Z("description",e.target.value)})]}),(0,i.jsx)("br",{}),(0,i.jsx)("div",{className:"mb-3",children:(0,i.jsx)(l.jO,{type:"file",id:"image",name:"image",accept:".png, .jpg, .jpeg",style:{display:"none"},onChange:X})}),(0,i.jsx)("p",{children:"\u1ea2nh s\u1ea3n ph\u1ea9m"}),(0,i.jsxs)("div",{className:"text-center position-relative",children:[(0,i.jsx)(l.DW,{disabled:!L,rounded:!0,src:O?URL.createObjectURL(O):y.image,width:200,height:200,style:{objectFit:"cover",border:"1px solid rgba(0, 0, 0, 0.5)",borderRadius:"10px"},onChange:X}),(0,i.jsx)("div",{className:"position-absolute bottom-0 start-50 translate-middle-x",style:{zIndex:1},children:(0,i.jsx)(l.u5,{disabled:!L,className:"mb-0 text-white",style:{backgroundColor:"rgba(0, 0, 0, 0.5)",border:"none",borderRadius:"0 0 10px 10px",width:"200px",fontSize:"20px"},onClick:()=>{document.getElementById("image").click()},children:"S\u1eeda"})})]})]})}),(0,i.jsx)(l.Ym,{children:(0,i.jsx)(l.u5,{className:"custom-button",style:{backgroundColor:"green",border:"none"},disabled:!L,onClick:()=>(async e=>{console.log(e),console.log(M);const s=localStorage.getItem("userInfo"),a=JSON.parse(s).data.accessToken,t=new FormData;for(const n in M)if("categories"===n){const e=D.map((e=>e.value));t.append(n,JSON.stringify(e))}else if("authors"===n){const e=I.map((e=>e.value));t.append(n,JSON.stringify(e))}else t.append(n,M[n]);try{R(!0);const s=await fetch("".concat(r.C,"/books/").concat(e),{method:"PUT",headers:{Authorization:"Bearer ".concat(a)},body:t});if(s.ok){console.log("D\u1eef li\u1ec7u \u0111\xe3 \u0111\u01b0\u1ee3c g\u1eedi th\xe0nh c\xf4ng.");const e=await s.json();o.Am.success(e.message,{onClose:()=>{H(),k(!1)}})}else{const e=await s.json();o.Am.info(e.message)}}catch(l){o.Am.error("L\u1ed7i trong qu\xe1 tr\xecnh x\u1eed l\xfd y\xeau c\u1ea7u:",l)}finally{R(!1)}})(x),children:"L\u01b0u"})})]})]})]})}),(0,i.jsx)(o.Ix,{position:"top-right",autoClose:2e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0,theme:"light"}),(0,i.jsx)(c.Z,{spinning:P,fullscreen:!0})]});var q}}}]);
//# sourceMappingURL=1839.fe9d2414.chunk.js.map