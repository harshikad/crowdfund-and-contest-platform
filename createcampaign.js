// pages/createcampaign.js
import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const CreateCampaign = () => {
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const [requiredAmount, setRequiredAmount] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert('Please upload an image.');
      return;
    }
    setIsLoading(true);
    try {
      const ipfsImageURI = await uploadToIPFS(image);
      alert('Campaign created successfully!');
      router.push('/dashboard');
    } catch (error) {
      console.error('Error creating campaign:', error);
      alert('Error creating campaign. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadToIPFS = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch('YOUR_IPFS_UPLOAD_URL', {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer YOUR_API_KEY`,
      },
    });
    const data = await response.json();
    return data.IpfsHash;
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Header>
          <h1>Create a New Campaign</h1>
        </Header>

        <FieldsContainer>
          <Field>
            <Label>Campaign Title:</Label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Field>

          <Field>
            <Label>Required Amount:</Label>
            <Input
              type="number"
              value={requiredAmount}
              onChange={(e) => setRequiredAmount(e.target.value)}
              required
            />
          </Field>
        </FieldsContainer>

        <Field>
          <Label>Story (Describe your story):</Label>
          <TextArea
            value={story}
            onChange={(e) => setStory(e.target.value)}
            required
          />
        </Field>

        <Field>
          <Label>Choose Category:</Label>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a Category</option>
            {['Education', 'Health', 'Environment', 'Charity'].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Select>
        </Field>

        <Field>
          <Label>Select Image (Upload Files to IPFS):</Label>
          <FileInput
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          {imagePreview && <ImagePreview src={imagePreview} alt="Image Preview" />}
        </Field>

        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? "Creating Campaign..." : "Start Campaign"}
        </SubmitButton>

        <ProgressContainer>
          <ProgressBar progress={(requiredAmount / 1000) * 100} />
        </ProgressContainer>
      </Form>
    </Container>
  );
};

export default CreateCampaign;

// Styled Components with Unique Colors and Fonts

const Container = styled.div`
  background: #f5f7fa;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Form = styled.form`
  background: #ffffff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
  transition: all 0.3s ease;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
  h1 {
    font-size: 24px;
    color: #333333;
  }
`;

const FieldsContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const Field = styled.div`
  flex: 1;
  min-width: 200px;
`;

const Label = styled.label`
  display: block;
  font-size: 15px;
  color: #5a5a5a;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 15px;
  color: #2d3748;
  background-color: #edf2f7;
  &:focus {
    border-color: #7b68ee;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 15px;
  color: #2d3748;
  background-color: #edf2f7;
  min-height: 120px;
  &:focus {
    border-color: #7b68ee;
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 15px;
  color: #2d3748;
  background-color: #edf2f7;
  &:focus {
    border-color: #7b68ee;
    outline: none;
  }
`;

const FileInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  color: #2d3748;
  background-color: #edf2f7;
  cursor: pointer;
  &:focus {
    border-color: #7b68ee;
    outline: none;
  }
`;

const ImagePreview = styled.img`
  margin-top: 16px;
  width: 100%;
  border-radius: 8px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #4a90e2;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #357abd;
  }

  &:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
`;

const ProgressContainer = styled.div`
  margin-top: 20px;
`;

const ProgressBar = styled.div`
  width: ${({ progress }) => progress}%;
  height: 8px;
  background-color: #4a90e2;
  border-radius: 4px;
  transition: width 0.3s ease;
`;
