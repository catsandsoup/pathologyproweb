import { User, Shield, Target, X } from 'lucide-react';
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
            <DialogContent className="sm:max-w-lg border-0 shadow-2xl">
                {/* Custom Close Button */}
                <button
                    onClick={onDismiss}
                    className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-10"
                >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </button>

                {/* Header Section with Icon */}
                <div className="text-center pt-6 pb-2">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                        <Target className="w-8 h-8 text-white" />
                    </div>
                    <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
                        Personalized Reference Ranges
                    </DialogTitle>
                    <DialogDescription className="text-gray-600 text-base leading-relaxed max-w-md mx-auto">
                        Help us provide more accurate health insights by specifying your biological sex. 
                        Many blood parameters have different normal ranges for males and females.
                    </DialogDescription>
                </div>

                {/* Selection Cards */}
                <div className="grid grid-cols-2 gap-4 my-8">
                    <button
                        onClick={() => onSelect('male')}
                        className="group relative p-6 rounded-2xl border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-200 bg-white hover:bg-blue-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        <div className="text-center">
                            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-100 group-hover:bg-blue-200 flex items-center justify-center transition-colors">
                                <User className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="font-semibold text-gray-900 text-lg mb-1">Male</div>
                            <div className="text-sm text-gray-500">Biological sex</div>
                        </div>
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </button>

                    <button
                        onClick={() => onSelect('female')}
                        className="group relative p-6 rounded-2xl border-2 border-gray-200 hover:border-pink-400 hover:shadow-lg transition-all duration-200 bg-white hover:bg-pink-50/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                    >
                        <div className="text-center">
                            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-pink-100 group-hover:bg-pink-200 flex items-center justify-center transition-colors">
                                <User className="w-6 h-6 text-pink-600" />
                            </div>
                            <div className="font-semibold text-gray-900 text-lg mb-1">Female</div>
                            <div className="text-sm text-gray-500">Biological sex</div>
                        </div>
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-500/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </button>
                </div>

                {/* Privacy Notice */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <div className="flex items-start space-x-3">
                        <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                            <div className="font-medium text-gray-900 text-sm mb-1">Your Privacy is Protected</div>
                            <div className="text-gray-600 text-sm leading-relaxed">
                                This information is only used for reference ranges and stays completely private in your browser. 
                                No data is transmitted to our servers.
                            </div>
                        </div>
                    </div>
                </div>

                {/* Skip Option */}
                <div className="text-center pb-2">
                    <Button
                        onClick={onDismiss}
                        variant="ghost"
                        className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 px-6"
                    >
                        Skip for now
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};