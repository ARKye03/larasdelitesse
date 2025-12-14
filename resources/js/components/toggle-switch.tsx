import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export const ToggleSwitch = ({
    className,
    ...props
}: React.ComponentProps<typeof Input>) => {
    return (
        <label className="switch">
            <Input
                type="checkbox"
                className={cn('toggle', className)}
                {...props}
            />
            <span className="slider"></span>
            <span className="card-side"></span>
        </label>
    );
};
