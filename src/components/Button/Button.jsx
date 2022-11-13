import PropTypes from 'prop-types';
import { MoreButton } from './Button.styled';

export const Button = ({ onClick, children }) => {
  return (
    <MoreButton type="button" onClick={onClick}>
      {children}
    </MoreButton>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
