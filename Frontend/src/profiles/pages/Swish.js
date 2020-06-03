import React from "react";
// import ModalImage from "react-modal-image";
// import { render } from "react-dom";
//import Lightbox from "react-image-lightbox";
//import Button from "../../shared/components/FormElements/Button";

import "./Swish.css";

/* const images = ["/Images/qr_2020.png"];

class Swish extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photoIndex: 0,
      isOpen: false,
    };
  }

  render() {
    const { photoIndex, isOpen } = this.state;

    return (
      <div>
        <Button type="button" onClick={() => this.setState({ isOpen: true })}>
          Swish Here!
        </Button>

        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            //nextSrc={images[(photoIndex + 1) % images.length]}
            // prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + images.length - 1) % images.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % images.length,
              })
            }
          />
        )}
      </div>
    );
  }
} */

const Swish = () => {
  // return <ModalImage medium={"/Images/qr_2020.png"} alt="Rikardo!" />;
  return <img src={"/Images/qr_2020.png"} alt="Rikard" className="image" />;
};

export default Swish;
