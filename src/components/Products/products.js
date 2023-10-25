import React from "react";
import "./products.css";
import IMG from "../../images/PCH.JPEG";
import IMG1 from "../../images/PCC.JPEG";
import IMG2 from "../../images/TNZ.JPEG";
import IMG3 from "../../images/HDM.JPEG";
import IMG4 from "../../images/MCT.JPEG";
import IMG5 from "../../images/PCO.JPEG";
import IMG6 from "../../images/MAZ.jpg";

const ProductsList = () => {
  return (
    <>
      <h1 className="title"></h1>
      <div className="productos">
        <div className="producto">
          <a href="#">
            <div className="producto_img">
              <img src={IMG} alt="img" />
            </div>
          </a>
          <div className="producto_footer">
            <h1> PALA POCERA CABO HIERRO GHERARDI </h1>
            <p> Categoria </p>
            <p className="price">$22000</p>
          </div>
          <div className="button">
            <button className="btn">Añadir al carrito</button>
            <div>
              <a href="#" className="btn">
                Vista
              </a>
            </div>
          </div>
        </div>
        <div className="producto">
          <a href="#">
            <div className="producto_img">
              <img src={IMG1} alt="img" />
            </div>
          </a>
          <div className="producto_footer">
            <h1> PALA PUNTA FORJADA CABO CORTO </h1>
            <p> Categoria </p>
            <p className="price">$18000</p>
          </div>
          <div className="button">
            <button className="btn">Añadir al carrito</button>
            <div>
              <a href="#" className="btn">
                Vista
              </a>
            </div>
          </div>
        </div>
        <div className="producto">
          <a href="#">
            <div className="producto_img">
              <img src={IMG2} alt="img" />
            </div>
          </a>
          <div className="producto_footer">
            <h1> TENAZA </h1>
            <p> Categoria </p>
            <p className="price">$5000</p>
          </div>
          <div className="button">
            <button className="btn">Añadir al carrito</button>
            <div>
              <a href="#" className="btn">
                Vista
              </a>
            </div>
          </div>
        </div>
        <div className="producto">
          <a href="#">
            <div className="producto_img">
              <img src={IMG3} alt="img" />
            </div>
          </a>
          <div className="producto_footer">
            <h1> HACHA DE MANO 600GR </h1>
            <p> Categoria </p>
            <p className="price">$12000</p>
          </div>
          <div className="button">
            <button className="btn">Añadir al carrito</button>
            <div>
              <a href="#" className="btn">
                Vista
              </a>
            </div>
          </div>
        </div>
        <div className="producto">
          <a href="#">
            <div className="producto_img">
              <img src={IMG4} alt="img" />
            </div>
          </a>
          <div className="producto_footer">
            <h1> MACHETE N20 </h1>
            <p> Categoria </p>
            <p className="price">$6000</p>
          </div>
          <div className="button">
            <button className="btn">Añadir al carrito</button>
            <div>
              <a href="#" className="btn">
                Vista
              </a>
            </div>
          </div>
        </div>
        <div className="producto">
          <a href="#">
            <div className="producto_img">
              <img src={IMG5} alt="img" />
            </div>
          </a>
          <div className="producto_footer">
            <h1> PICO PUNTA Y PALA 75MM </h1>
            <p> Categoria </p>
            <p className="price">$18000</p>
          </div>
          <div className="button">
            <button className="btn">Añadir al carrito</button>
            <div>
              <a href="#" className="btn">
                Vista
              </a>
            </div>
          </div>
        </div>
        <div className="producto">
          <a href="#">
            <div className="producto_img">
              <img src={IMG6} alt="img" />
            </div>
          </a>
          <div className="producto_footer">
            <h1> MAZA 1KG </h1>
            <p> Categoria </p>
            <p className="price">$4500</p>
          </div>
          <div className="button">
            <button className="btn">Añadir al carrito</button>
            <div>
              <a href="#" className="btn">
                Vista
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsList;
