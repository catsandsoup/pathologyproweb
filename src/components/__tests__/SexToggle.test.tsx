import { render, screen, fireEvent } from '@testing-library/react';
import { SexToggle } from '../SexToggle';

// Mock the UI components
jest.mock('@/components/ui/select', () => ({
  Select: ({ children, value, onValueChange }: any) => (
    <select data-testid="sex-select" value={value} onChange={(e) => onValueChange(e.target.value)}>
      {children}
    </select>
  ),
  SelectContent: ({ children }: any) => <div>{children}</div>,
  SelectItem: ({ children, value }: any) => <option value={value}>{children}</option>,
  SelectTrigger: ({ children }: any) => <div>{children}</div>,
  SelectValue: () => <span>Select Value</span>,
}));

jest.mock('@/components/ui/tooltip', () => ({
  TooltipProvider: ({ children }: any) => <div>{children}</div>,
  Tooltip: ({ children }: any) => <div>{children}</div>,
  TooltipTrigger: ({ children }: any) => <div>{children}</div>,
  TooltipContent: ({ children }: any) => <div data-testid="tooltip-content">{children}</div>,
}));

describe('SexToggle', () => {
  const mockOnSexChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with male selected', () => {
    render(
      <SexToggle
        currentSex="male"
        onSexChange={mockOnSexChange}
      />
    );

    expect(screen.getByText('Reference ranges:')).toBeInTheDocument();
    expect(screen.getByTestId('sex-select')).toHaveValue('male');
  });

  it('renders with female selected', () => {
    render(
      <SexToggle
        currentSex="female"
        onSexChange={mockOnSexChange}
      />
    );

    expect(screen.getByTestId('sex-select')).toHaveValue('female');
  });

  it('calls onSexChange when selection changes', () => {
    render(
      <SexToggle
        currentSex="male"
        onSexChange={mockOnSexChange}
      />
    );

    const select = screen.getByTestId('sex-select');
    fireEvent.change(select, { target: { value: 'female' } });

    expect(mockOnSexChange).toHaveBeenCalledWith('female');
  });

  it('applies custom className', () => {
    const { container } = render(
      <SexToggle
        currentSex="male"
        onSexChange={mockOnSexChange}
        className="custom-class"
      />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('displays tooltip content', () => {
    render(
      <SexToggle
        currentSex="male"
        onSexChange={mockOnSexChange}
      />
    );

    expect(screen.getByText('Sex-specific reference ranges')).toBeInTheDocument();
    expect(screen.getByText('Switch between male and female ranges for more accurate results')).toBeInTheDocument();
  });
});