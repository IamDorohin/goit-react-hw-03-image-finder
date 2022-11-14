import { ThreeDots } from 'react-loader-spinner';
import { LoaderContainer } from 'components/Loader/Loader.styled';

export const Loader = () => {
  return (
    <LoaderContainer>
      <ThreeDots
        visible={true}
        height="150"
        width="150"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        color="red"
      />
    </LoaderContainer>
  );
};
