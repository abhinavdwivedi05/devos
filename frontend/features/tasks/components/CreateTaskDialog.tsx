import React from "react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

interface CreateTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  title: string;
  onChangeTitle: (val: string) => void;
  description: string;
  onChangeDescription: (val: string) => void;
  priority: "low" | "medium" | "high";
  onChangePriority: (val: "low" | "medium" | "high") => void;
  dueDate: string;
  onChangeDueDate: (val: string) => void;
  labels: string;
  onChangeLabels: (val: string) => void;
  isRecurring: boolean;
  onToggleRecurring: (val: boolean) => void;
  recurrenceRule: string;
  onChangeRecurrenceRule: (val: string) => void;
}

export function CreateTaskDialog({
  isOpen,
  onClose,
  onSubmit,
  title,
  onChangeTitle,
  description,
  onChangeDescription,
  priority,
  onChangePriority,
  dueDate,
  onChangeDueDate,
  labels,
  onChangeLabels,
  isRecurring,
  onToggleRecurring,
  recurrenceRule,
  onChangeRecurrenceRule,
}: CreateTaskDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-xs" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-md border border-border bg-card shadow-lg p-6">
        <h2 className="text-sm font-bold text-foreground mb-4">Append Custom Task</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            label="Task Title"
            placeholder="e.g. Refactor API controllers"
            value={title}
            onChange={(e) => onChangeTitle(e.target.value)}
            required
          />
          <Input
            label="Description"
            placeholder="Optional task description"
            value={description}
            onChange={(e) => onChangeDescription(e.target.value)}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Priority Level"
              options={[
                { value: "low", label: "Low" },
                { value: "medium", label: "Medium" },
                { value: "high", label: "High" },
              ]}
              value={priority}
              onChange={(e) => onChangePriority(e.target.value as any)}
            />
            <Input
              label="Due Date"
              type="date"
              value={dueDate}
              onChange={(e) => onChangeDueDate(e.target.value)}
            />
          </div>

          <Input
            label="Labels (comma-separated)"
            placeholder="e.g. frontend, bug, api"
            value={labels}
            onChange={(e) => onChangeLabels(e.target.value)}
          />

          <div className="flex items-center space-x-2.5 pt-1 select-none">
            <input
              type="checkbox"
              id="taskRecurring"
              checked={isRecurring}
              onChange={(e) => onToggleRecurring(e.target.checked)}
              className="rounded-sm bg-card border border-border text-accent-blue focus:ring-accent-blue h-4 w-4 cursor-pointer"
            />
            <label htmlFor="taskRecurring" className="text-xs font-semibold text-muted select-none cursor-pointer">
              Recurring Task
            </label>
          </div>

          {isRecurring && (
            <Select
              label="Recurrence Frequency"
              options={[
                { value: "daily", label: "Daily" },
                { value: "weekly", label: "Weekly" },
                { value: "monthly", label: "Monthly" },
              ]}
              value={recurrenceRule}
              onChange={(e) => onChangeRecurrenceRule(e.target.value)}
            />
          )}

          <div className="flex justify-end space-x-2 pt-2">
            <Button type="button" variant="secondary" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="default" size="sm">
              Create Task
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
