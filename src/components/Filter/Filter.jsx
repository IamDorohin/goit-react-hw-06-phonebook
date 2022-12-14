// import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { filteredContactsName } from 'redux/filter/slice';
import {
  FilterContainer,
  FilterTitle,
  FilterInput,
} from 'components/Filter/Filter.styled';

export const Filter = () => {
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const filterContactsHandler = event => {
    console.log(event.target.value);
    dispatch(filteredContactsName(event.target.value));
  };

  return (
    <FilterContainer>
      <FilterTitle>Find contacts by name:</FilterTitle>
      <FilterInput
        type="text"
        value={filter}
        onChange={filterContactsHandler}
      />
    </FilterContainer>
  );
};

// Filter.propTypes = {
//   value: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
// };
