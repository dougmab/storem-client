import {Input} from '@/components/ui/input.tsx';
import {Search, X} from 'lucide-react';
import {FormEvent, useState} from 'react';

const SearchInput = ({onSubmit, className, label}: { onSubmit: (data: string) => any, className?: string, label?: string }) => {
  const [search, setSearch] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const submitSearch = (e: FormEvent) => {
    e.preventDefault();
    if (search.trim() === '') return;
    onSubmit(search)
    setSearch('');
  };

  return (
    <form className={`relative ${className}`} onSubmit={submitSearch}>
      <Input
        type="text"
        className={`w-full p-2 pr-[24px] border rounded-full`}
        placeholder={label || 'Search...'}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        className="absolute top-1/2 right-0 -translate-y-1/2 -translate-x-1/2 text-foreground"
        onMouseDown={(e: FormEvent) => {
          e.preventDefault();
          console.log(isFocused)
          if (isFocused) {
            setSearch('');
          }
        }}>
        {isFocused ? <X size={16}/> : <Search size={16}/>}
      </button>
    </form>
  );
};
export default SearchInput;
