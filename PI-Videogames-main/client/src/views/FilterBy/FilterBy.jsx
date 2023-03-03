import React from "react";
import { connect } from "react-redux";
import { orderBy, filterBy } from "../../redux/actions";
import * as p from "./FilterBy.module.css";

function FilteredBy({ orderBy, genres, filterBy }) {
  const handleSelect = (e) => {
    filterBy(e.target.value);
  };

  const handleSelect2 = (e) => {
    orderBy(e.target.value);
  };
  return (
    <div className={p.containerdiv}>
      <select className={p.selectCont} onChange={handleSelect} name="" id="">
        <option className={p.option} value="default">
          TODOS...
        </option>
        <optgroup className={p.optionGroup} label="DataBase">
          <option className={p.option} value="DB">
            CREADOS
          </option>
        </optgroup>
        <optgroup className={p.optionGroup} label="API">
          <option className={p.option} value="API">
            API
          </option>
        </optgroup>
        <optgroup className={p.optionGroup} label="GENRES">
          {genres &&
            genres.map((g) => (
              <option key={g.name} value={g.name}>
                {g.name}
              </option>
            ))}
        </optgroup>
      </select>
      <select className={p.selectCont} onChange={handleSelect2} name="" id="">
        <option className={p.option} value="default">
          ORDEN...
        </option>
        <optgroup className={p.optionGroup} label="Rating">
          <option className={p.option} value="asc">
            Mayor a Menor
          </option>
          <option className={p.option} value="desc">
            Menor a Mayor
          </option>
        </optgroup>
        <optgroup className={p.optionGroup} label="Alphabetic">
          <option className={p.option} value="A-Z">
            A - Z
          </option>
          <option className={p.option} value="Z-A">
            Z - A
          </option>
        </optgroup>
      </select>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    genres: state.genres,
  };
};

export default connect(mapStateToProps, { orderBy, filterBy })(FilteredBy);
