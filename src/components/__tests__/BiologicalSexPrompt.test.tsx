import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BiologicalSexPrompt } from '../BiologicalSexPrompt';

// Mock the UI components
jest.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children, open }: any) => open ? <div data-testid="dialog">{children}</div> : null,
  DialogContent: ({ children }: any) => <div data-testid="dialog-content">{children}</div>,
  DialogHeader: ({ children }: any) => <div data-testid="dialog-header">{children}</div>,
  DialogTitle: ({ children }: any) => <h2 data-testid="dialog-title">{children}</h2>,
  DialogDescription: ({ children }: any) => <div data-testid="dialog-description">{children}</div>,
}));

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} data-testid={`button-${props.variant || 'default'}`} {...props}>
      {children}
    </button>
  ),
}));

describe('BiologicalSexPrompt', () => {
  const mockOnSelect = jest.fn();
  const mockOnDismiss = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders when isOpen is true', () => {
    render(
      <BiologicalSexPrompt
        isOpen={true}
        onSelect={mockOnSelect}
        onDismiss={mockOnDismiss}
      />
    );

    expect(screen.getByTestId('dialog')).toBeInTheDocument();
    expect(screen.getByText('More Accurate Reference Ranges')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(
      <BiologicalSexPrompt
        isOpen={false}
        onSelect={mockOnSelect}
        onDismiss={mockOnDismiss}
      />
    );

    expect(screen.queryByTestId('dialog')).not.toBeInTheDocument();
  });

  it('calls onSelect with "male" when Male button is clicked', () => {
    render(
      <BiologicalSexPrompt
        isOpen={true}
        onSelect={mockOnSelect}
        onDismiss={mockOnDismiss}
      />
    );

    const maleButton = screen.getByText('Male');
    fireEvent.click(maleButton);

    expect(mockOnSelect).toHaveBeenCalledWith('male');
  });

  it('calls onSelect with "female" when Female button is clicked', () => {
    render(
      <BiologicalSexPrompt
        isOpen={true}
        onSelect={mockOnSelect}
        onDismiss={mockOnDismiss}
      />
    );

    const femaleButton = screen.getByText('Female');
    fireEvent.click(femaleButton);

    expect(mockOnSelect).toHaveBeenCalledWith('female');
  });

  it('calls onDismiss when Skip button is clicked', () => {
    render(
      <BiologicalSexPrompt
        isOpen={true}
        onSelect={mockOnSelect}
        onDismiss={mockOnDismiss}
      />
    );

    const skipButton = screen.getByText('Skip for now');
    fireEvent.click(skipButton);

    expect(mockOnDismiss).toHaveBeenCalled();
  });

  it('displays privacy notice', () => {
    render(
      <BiologicalSexPrompt
        isOpen={true}
        onSelect={mockOnSelect}
        onDismiss={mockOnDismiss}
      />
    );

    expect(screen.getByText(/This information is only used for reference ranges and stays private/)).toBeInTheDocument();
  });

  it('displays explanation text', () => {
    render(
      <BiologicalSexPrompt
        isOpen={true}
        onSelect={mockOnSelect}
        onDismiss={mockOnDismiss}
      />
    );

    expect(screen.getByText(/To provide you with more accurate reference ranges/)).toBeInTheDocument();
    expect(screen.getByText(/Many blood test parameters have different normal ranges/)).toBeInTheDocument();
  });
});