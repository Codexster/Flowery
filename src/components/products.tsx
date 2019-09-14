import * as React from "react";
import { Component } from "react";
import { throwStatement } from "@babel/types";
import MaterialIcon from "material-design-icons";

class Products extends Component {
  state = {
    products: [],
    images: [],
    loading: true,
    error: false,
    showPopup: false,
    productName: "",
    productPotHeight: "",
    productHeight: "",
    productCode: "",
    productProperties: [],
    productImages: [],
    search: ""
  };

  togglePopup(product?) {
    this.setState({
      showPopup: !this.state.showPopup,
      productName: product.Naam,
      productPotHeight: product.Potmaat,
      productHeight: product.Hoogte,
      productCode: product.Code,
      productProperties: product.Eigenschappen,
      productImages: product.Fotos
    });
  }

  closePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  updateSearch(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ search: e.target.value });
  }

  componentDidMount() {
    fetch("https://api.floraxchange.nl/artikel?relatieid=215")
      .then(response => response.json())
      .then(response =>
        this.setState({
          products: response,
          loading: false
        })
      )
      .catch(error =>
        this.setState({
          loading: false,
          error: true
        })
      );
  }

  render() {
    const { products: products, images: images, loading, error } = this.state;
    console.log(products[0]);
    let filteredProducts = products.filter(product => {
      console.log(product);
      return (
        product.Naam.replace(/\s/g, "")
          .toLowerCase()
          .indexOf(this.state.search.replace(/\s/g, "").toLowerCase()) !== -1 ||
        product.Hoogte.replace(/\s/g, "").indexOf(
          this.state.search.replace(/\s/g, "")
        ) !== -1
      );
    });
    return (
      <React.Fragment>
        <div className="product__filter">
          <div className="search-box">
            <i className="material-icons">search</i>
            <input
              type="text"
              placeholder="zoeken.."
              value={this.state.search}
              onChange={this.updateSearch.bind(this)}
            />
          </div>
        </div>
        <div className="products">
          {loading && <div className="spinner"></div>}
          {!loading &&
            !error &&
            filteredProducts.map(product => (
              <div
                className="product"
                key={product.ID}
                onClick={() => this.togglePopup(product)}
              >
                <div className="product__image">
                  {product.Fotos.map(foto => (
                    <img key={foto.ID} src={foto.UrlOrigineel} />
                  )).shift()}
                </div>
                <div className="product__body">
                  <div className="product__body__header">
                    {product.Naam}
                    <div className="product__body__header--size">
                      {product.Hoogte}
                    </div>
                  </div>

                  {product.ArtikelGroepNaam}
                </div>
              </div>
            ))}
          {error && <div>Error message</div>}
        </div>
        {this.state.showPopup ? (
          <div className="overlay">
            <div className="overlay__backdrop">
              <div className="modal">
                <div className="modal__images">
                  {this.state.productImages
                    .map(foto => <img key={foto.ID} src={foto.UrlOrigineel} />)
                    .shift()}
                </div>
                <div className="modal__body">
                  <i
                    className="material-icons"
                    onClick={() => this.closePopup()}
                  >
                    close
                  </i>

                  <h3>{this.state.productName}</h3>
                  <div>
                    Product code<p>{this.state.productCode}</p>
                  </div>
                  <div>
                    Product Naam<p>{this.state.productName}</p>
                  </div>
                  <div>
                    Pot hoogte<p>{this.state.productPotHeight}</p>
                  </div>
                  <div>
                    Product hoogte<p>{this.state.productHeight}</p>
                  </div>
                  {this.state.productProperties.map(property => (
                    <div className="test" key={property.ID}>
                      {property.EigenschapNaam}
                      <p>{property.Waarde}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default Products;
