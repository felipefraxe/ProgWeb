
class IntegerSet {
    constructor(maxVal) {
        this.maxVal = maxVal;
        this.set = Array(maxVal + 1).fill(false);
    }
    
    _editVal(num, op) {
        if(num < 0 || num > this.maxVal)
            return;
        this.set[num] = op;
    }
    
    insert(num) {
        this._editVal(num, true);
    }
    
    remove(num) {
        this._editVal(num, false);
    }
    
    union(other) {
        const union = new IntegerSet(Math.max(this.maxVal, other.maxVal));
        let i = 0;
        let j = 0;
        while(i < this.set.length && j < other.set.length) {
            if(this.set[i])
                union.insert(i);
            if(other.set[j])
                union.insert(j);
            i++;
            j++;
        }
        
        while(i < this.set.length) {
            if(this.set[i])
                union.insert(i);
            i++;
        }
        
        while(j < other.set.length) {
            if(other.set[j])
                union.insert(j);
            j++;
        }
        
        return union;
    }
    
    intersection(other) {
        const intersec = new IntegerSet(Math.min(this.maxVal, other.maxVal));
        for(let i = 0; i < intersec.length; i++) {
            if(this.set[i] && this.set[i] === other.set[i])
                intersec.insert(i);
        }
        return intersec;
    }

    diff(other) {
        const diff = new IntegerSet(Math.max(this.maxVal, other.maxVal));
        let i = 0;
        let j = 0;
        while(i < this.set.length && j < other.set.length) {
            if(this.set[i] && this.set[i] !== other.set[j])
                diff.insert(i);
            i++;
            j++;
        }

        while(i < this.set.length) {
            if(this.set[i])
                un.insert(i);
            i++;
        }

        return diff;
    }

    toString() {
        let str = "";
        for(let i = 0; i < this.set.length; i++) {
            str += `${i}: ${this.set[i]}`;
        }
        return str;
    }
}

const set1 = new IntegerSet(10);
const set2 = new IntegerSet(10);
for(let i = 0; i < 10; i += 2)
    set1.insert(i);
for(let i = 1; i < 11; i += 2)
    set2.insert(i);
set2.insert(2);
set2.insert(4);
set1.remove(0);
console.log(set1.intersection(set2));
console.log(set1.diff(set2));
console.log(set1.union(set2));