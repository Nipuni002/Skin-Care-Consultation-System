import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Swal from 'sweetalert2';
import './SkinCareChatbot.css'; // We'll create this CSS file

function SkinCareChatbot() {
  const [step, setStep] = useState(0);
  const [chatData, setChatData] = useState({
    skinType: '',
    issue: '',
    routine: ''
  });
  const [recommendation, setRecommendation] = useState('');
  const [currentInput, setCurrentInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const questions = [
    'What is your skin type? (Dry / Oily / Combination / Sensitive)',
    'What skin concerns would you like to address? (Acne / Wrinkles / Dryness / Hyperpigmentation)',
    'How often do you follow a skincare routine? (Daily / Weekly / Rarely / Never)'
  ];

  const handleAnswer = async (answer) => {
    if (!answer.trim()) return;

    // Add user message to chat history
    setChatHistory(prev => [...prev, { sender: 'user', text: answer }]);
    
    const newChatData = { ...chatData };
    if (step === 0) newChatData.skinType = answer;
    else if (step === 1) newChatData.issue = answer;
    else if (step === 2) newChatData.routine = answer;

    setChatData(newChatData);
    setCurrentInput('');

    if (step < 2) {
      // Add bot's next question to chat history
      setChatHistory(prev => [...prev, { sender: 'bot', text: questions[step + 1] }]);
      setStep(step + 1);
      return;
    }

    // step === 2, call API
    setLoading(true);
    try {
      // Add loading message to chat history
      setChatHistory(prev => [...prev, { sender: 'bot', text: "Analyzing your responses... Please wait while I prepare your personalized recommendation." }]);
      
      const response = await axios.post('http://localhost:8081/consult', newChatData);

      if (response && response.data && response.data.recommendation) {
        setRecommendation(response.data.recommendation);
        // Add recommendation to chat history
        setChatHistory(prev => [...prev, { sender: 'bot', text: response.data.recommendation }]);
        Swal.fire({
          title: 'Consultation Completed',
          text: 'Your personalized skincare recommendation is ready!',
          icon: 'success',
          confirmButtonColor: '#5d78ff',
          background: '#f9f9f9'
        });
        setStep(step + 1);
      } else {
        throw new Error('Invalid response');
      }
    } catch (error) {
      console.error('API Error:', error);
      setChatHistory(prev => [...prev, { sender: 'bot', text: "Sorry, I encountered an error processing your request. Please try again later." }]);
      Swal.fire({
        title: 'Error',
        text: 'Consultation failed. Please try again.',
        icon: 'error',
        confirmButtonColor: '#ff5d5d',
        background: '#f9f9f9'
      });
    } finally {
      setLoading(false);
    }
  };

 const generateReport = () => {
  const doc = new jsPDF();
  
  // Add header
  doc.setFillColor(232, 168, 124);
  doc.rect(0, 0, 220, 30, 'F');
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.text('SkinGenius AI', 105, 20, { align: 'center' });
  
  // Reset text color for content
  doc.setTextColor(0, 0, 0);
  
  // Report title
  doc.setFontSize(16);
  doc.text('Personalized Skincare Consultation Report', 105, 45, { align: 'center' });
  
  // Client details section
  doc.setFontSize(12);
  doc.text('Client Information', 14, 60);
  doc.line(14, 62, 60, 62);
  
  // Add generated date
  const date = new Date().toLocaleDateString();
  doc.text(`Generated on: ${date}`, 150, 60);
  
  // Create a simple table without autoTable
  let yPosition = 70;
  const questions = ['Skin Type', 'Primary Concern', 'Routine Frequency'];
  const answers = [chatData.skinType, chatData.issue, chatData.routine];
  
  // Table header
  doc.setFillColor(232, 168, 124);
  doc.rect(14, yPosition, 90, 10, 'F');
  doc.rect(104, yPosition, 90, 10, 'F');
  doc.setTextColor(255, 255, 255);
  doc.text('Question', 30, yPosition + 7);
  doc.text('Response', 120, yPosition + 7);
  
  yPosition += 10;
  doc.setTextColor(0, 0, 0);
  
  // Table rows
  for (let i = 0; i < questions.length; i++) {
    if (i % 2 === 0) {
      doc.setFillColor(240, 240, 255);
      doc.rect(14, yPosition, 180, 10, 'F');
    }
    doc.text(questions[i], 20, yPosition + 7);
    doc.text(answers[i], 110, yPosition + 7);
    yPosition += 10;
  }
  
  // Recommendations section
  doc.setFontSize(14);
  doc.text('Personalized Recommendations', 14, yPosition + 20);
  doc.line(14, yPosition + 22, 60, yPosition + 22);
  
  // Clean the recommendation text before adding to PDF
  const cleanRecommendation = recommendation
    .replace(/[^\x00-\x7F]/g, "") // Remove non-ASCII characters
    .replace(/[•◦]/g, "•") // Standardize bullet points
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
  
  doc.setFontSize(11);
  
  // Split into lines and process each line
  const recommendationLines = cleanRecommendation.split('\n');
  let currentY = yPosition + 30;
  
  for (const line of recommendationLines) {
    // Skip empty lines
    if (!line.trim()) {
      currentY += 5;
      continue;
    }
    
    // Add bullet points for list items
    if (line.trim().startsWith('-') || line.trim().startsWith('•')) {
      doc.setFontSize(11);
      doc.text('•', 14, currentY);
      const bulletText = line.replace(/^[-•]\s*/, '');
      const bulletLines = doc.splitTextToSize(bulletText, 170);
      doc.text(bulletLines, 20, currentY);
      currentY += bulletLines.length * 7 + 2;
    } 
    // Handle section headers
    else if (line.trim().endsWith(':')) {
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      const headerLines = doc.splitTextToSize(line, 180);
      doc.text(headerLines, 14, currentY);
      doc.setFont(undefined, 'normal');
      currentY += headerLines.length * 7 + 5;
    }
    // Regular text
    else {
      doc.setFontSize(11);
      const textLines = doc.splitTextToSize(line, 180);
      doc.text(textLines, 14, currentY);
      currentY += textLines.length * 7 + 2;
    }
    
    // Add some space between paragraphs
    currentY += 3;
  }
  
  // Footer
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('© SkinGenius AI - This report is generated based on your inputs and should not replace professional medical advice.', 
    105, 285, { align: 'center' });
  
  doc.save(`SkinGenius_Report_${date.replace(/\//g, '-')}.pdf`);
};

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <div className="logo">
          <span className="logo-icon">✨</span>
          <h2>SkinGenius AI</h2>
        </div>
        <p className="tagline">Your personalized skincare consultant</p>
      </div>
      
      <div className="chatbot-body">
        <div className="chat-history">
          {/* Initial greeting */}
          <div className="message bot">
            <div className="avatar">AI</div>
            <div className="content">
              <p>Hello! I'm here to help you with your skincare routine. Let's start with a few questions to understand your skin better.</p>
              <p className="question">{questions[0]}</p>
            </div>
          </div>
          
          {/* Chat history */}
          {chatHistory.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.sender === 'bot' ? (
                <>
                  <div className="avatar">AI</div>
                  <div className="content">
                    {index === chatHistory.length - 1 && step === 3 ? (
                      <>
                        <p>Here's your personalized skincare recommendation:</p>
                        <div className="recommendation-box">
                          {msg.text.split('\n').map((line, i) => (
                            <p key={i}>{line}</p>
                          ))}
                        </div>
                      </>
                    ) : (
                      <p>{msg.text}</p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="avatar">You</div>
                  <div className="content">
                    <p>{msg.text}</p>
                  </div>
                </>
              )}
            </div>
          ))}
          
          {loading && (
            <div className="message bot">
              <div className="avatar">AI</div>
              <div className="content loading">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {step < 3 ? (
          <div className="input-area">
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && currentInput.trim() !== '') {
                  handleAnswer(currentInput.trim());
                }
              }}
              disabled={loading}
              placeholder="Type your answer here..."
            />
            <button
              onClick={() => handleAnswer(currentInput.trim())}
              disabled={loading || currentInput.trim() === ''}
              className="submit-btn"
            >
              {loading ? (
                <span className="spinner"></span>
              ) : (
                'Send'
              )}
            </button>
          </div>
        ) : (
          <div className="report-actions">
            <button onClick={generateReport} className="download-btn">
              Download Full Report (PDF)
            </button>
            <p className="disclaimer">
              Your personalized skincare routine has been generated based on your inputs. 
              For persistent skin issues, please consult a dermatologist.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SkinCareChatbot;