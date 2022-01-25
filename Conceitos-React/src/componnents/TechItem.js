import React from "react";
import PropTypes from "prop-types";

//Recebe a tech e a função de deletar enviada pelo TechList
function TechItem(props) {
  return (
    <li>
      {props.tech}
      <button onClick={props.onDelete} type="button">
        Remover
      </button>
    </li>
  );
}

//Define um valor padrão para uma propriedade caso a função não receba tal
TechItem.defaultProps = {
  tech: "oculto",
};

/*
  Em uma classe usa-se assim:
  static defaultProps = {
    tech: "oculto"
  };
*/

//Define o tipo das props
TechItem.propTypes = {
  tech: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
};

export default TechItem;
