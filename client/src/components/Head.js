import "../styles/head.css";

const Head = (props) => {
  const { title, image } = props;

  return (
    <div className="head">
      <span className="head__title">{title}</span>
      <img className="head__img" alt={image.alt} src={image.src} />
    </div>
  );
};

export default Head;
