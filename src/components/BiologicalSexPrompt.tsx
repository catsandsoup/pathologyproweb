import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

interface BiologicalSexPromptProps {
    isOpen: boolean;
    onSelect: (sex: 'male' | 'female') => void;
    onDismiss: () => void;
}

export const BiologicalSexPrompt = ({
    isOpen,
    onSelect,
    onDismiss,
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onDismiss()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex items-center space-x-2">
                        <User className="w-5 h-5 text-blue-600" />
                        <DialogTitle>More Accurate Reference Ranges</DialogTitle>
                    </div>
                    <DialogDescription className="text-left space-y-3">
                        <p>
                            To provide you with more accurate reference ranges for your blood test results,
                            we'd like to know your biological sex.
                        </p>
                        <p className="text-sm text-gray-600">
                            Many blood test parameters have different normal ranges for males and females.
                            This helps us give you more precise health insights.
                        </p>
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            onClick={() => onSelect('male')}
                            variant="outline"
                            className="h-12 flex flex-col items-center justify-center space-y-1 hover:bg-blue-50 hover:border-blue-300"
                        >
                            <span className="font-medium">Male</span>
                            <span className="text-xs text-gray-500">Biological sex</span>
                        </Button>

                        <Button
                            onClick={() => onSelect('female')}
                            variant="outline"
                            className="h-12 flex flex-col items-center justify-center space-y-1 hover:bg-pink-50 hover:border-pink-300"
                        >
                            <span className="font-medium">Female</span>
                            <span className="text-xs text-gray-500">Biological sex</span>
                        </Button>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                        <p className="text-xs text-gray-500">
                            This information is only used for reference ranges and stays private in your browser.
                        </p>
                        <Button
                            onClick={onDismiss}
                            variant="ghost"
                            size="sm"
                            className="text-gray-500 hover:text-gray-700"
                        >
                            Skip for now
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};