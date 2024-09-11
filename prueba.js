function generarID(str) {
    const hash = str.hashCode();
    return Math.abs(hash % 10000); 
}

String.prototype.hashCode = function() {
    var hash = 0;
    if (this.length === 0) return hash;
    for (var i = 0; i < this.length; i++) {
        hash = ((hash << 5) - hash) + this.charCodeAt(i);   
        hash |= 0;
    }
    return hash;
};



console.log(generarID("4756634803Rojos"));
