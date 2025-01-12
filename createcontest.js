// pages/createContest.js
import React, { useState } from 'react';
import { ethers } from 'ethers';
import ContestFactoryABI from '../contracts/ContestFactory.json'; // The ABI for ContestFactory

const CreateContest = () => {
  const [title, setTitle] = useState('');
  const [prizeAmount, setPrizeAmount] = useState('');
  const [imageURI, setImageURI] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleCreateContest = async () => {
    // Connect to Ethereum wallet (MetaMask, for example)
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contestFactoryAddress = 'YOUR_CONTEST_FACTORY_CONTRACT_ADDRESS'; // Replace with deployed address
      const contestFactory = new ethers.Contract(contestFactoryAddress, ContestFactoryABI, signer);

      try {
        const tx = await contestFactory.createContest(
          title,
          ethers.utils.parseEther(prizeAmount),
          imageURI,
          new Date(startDate).getTime() / 1000, // Convert to Unix timestamp
          new Date(endDate).getTime() / 1000,   // Convert to Unix timestamp
          'Category' // Set contest category here
        );
        await tx.wait();
        alert('Contest Created Successfully!');
      } catch (err) {
        console.error(err);
        alert('Error creating contest!');
      }
    } else {
      alert('Please install MetaMask');
    }
  };

  return (
    <div>
      <h1>Create a New Contest</h1>
      <input
        type="text"
        placeholder="Contest Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Prize Amount (ETH)"
        value={prizeAmount}
        onChange={(e) => setPrizeAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Image URI"
        value={imageURI}
        onChange={(e) => setImageURI(e.target.value)}
      />
      <input
        type="datetime-local"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="datetime-local"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <button onClick={handleCreateContest}>Create Contest</button>
    </div>
  );
};

export default CreateContest;
