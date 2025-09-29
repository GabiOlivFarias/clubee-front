# React + Vite + Three.js

### A primeira renderização da abelha em 3D foi mais dificil, por isso vou documentar o passo a passo que segui.

- depois de gerar o projeto com:  
    `npm create vite@latest teste-3d-final -- --template react`  
    `cd teste-3d-final`  
    `npm install`  
  `npm install three @react-three/fiber @react-three/drei`  Aqui é o Three.js para o React  
  Até esse ponto eu já tinha tudo o que precisava, porém meu firewall colocava meu arquivo do Three em quarentena, então temos que tirar ele de lá, quando formos rodar o projeto, automaticamente vai aparecer uma popoup informando sobre isso:  
  <img width="579" height="383" alt="image" src="https://github.com/user-attachments/assets/97dc9188-7995-40b2-b0b3-8ea200de88e5" />  
Então vamos clicar em ver detalhes e depois Abrir quarentena:    
<img width="573" height="650" alt="image" src="https://github.com/user-attachments/assets/00e73528-c247-4990-9c79-498c0a0fec49" />    
Depois vamos checkar essa linha do react-three_drei.js    
<img width="851" height="420" alt="image" src="https://github.com/user-attachments/assets/053444d9-178e-4b2a-9a53-1ecdf75dab3f"       
E depois vamos no 3 pontos na parte inferior, e selecionar a opção restaurar e adicionar exceção:      
  <img width="872" height="625" alt="image" src="https://github.com/user-attachments/assets/cd0cb807-172b-4b42-97d5-9a9ecfac57dd" />      
Depois disso podemos fazer algumas alterações em alguns arquivos e baixar a imagem em 3D:  
- como no primeiro commit, vamos fazer as alterações nos arquivos: src/index.css, src/App.jsx e Model.jsx(Veja esses arquivos no primeiro commit.)  
- depois vamos criar a pasta models dentro de public.  
- vamos num site baixar nosso arquivo glb(tem que ser esse formato se você tá tentando pela primeira vez), eu gosto do site https://sketchfab.com/  
- Depois de deixar os 3 arquivos como no meu primeiro commit, você pode rodar o projeto com `npm run dev` e verá sua figura 3D.  




  
