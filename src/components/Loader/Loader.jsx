import { ThreeDots } from 'react-loader-spinner';
import { LoaderContainer } from 'components/Loader/Loader.styled';

export const Loader = () => {
  return (
    <LoaderContainer>
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        color="red"
      />
    </LoaderContainer>
  );
};
