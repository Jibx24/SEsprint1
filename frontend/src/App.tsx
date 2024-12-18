import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu  from './page/menu';
import MenuCreate  from './page/menu/create';
import MenuEdit  from './page/menu/edit';


function App() {
   return (
      <div>
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<Menu />} />
               <Route path="/menu" element={<Menu />} />
               <Route path="/menu/create" element={<MenuCreate />} />
               <Route path="/menu/edit/:id" element={<MenuEdit />} />
            </Routes>
         </BrowserRouter>
      </div>
   );
}

export default App;
