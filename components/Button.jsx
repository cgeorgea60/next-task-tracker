import PropTypes from "prop-types";

const Button = ({ bgcolor, text, onClick }) => {
  return (
    <div
      className="btn"
      style={{ backgroundColor: bgcolor }}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  bgcolor: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
